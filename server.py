import json
import hashlib
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from BackendFiles.database import *


app = Flask(__name__)
app.config.from_pyfile('BackendFiles/config.py')

jwt = JWTManager(app)


CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

db.init_app(app)
ma.init_app(app)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


@app.route('/token', methods=["POST"])
def create_token():
    usernameInput = request.json.get("username", None)
    passwordInput = request.json.get("password", None)
    print(usernameInput, passwordInput)

    all_users = Users.query.all()
    users = users_schema_many.dump(all_users)
    user = 0
    for i in users:
        if i["username"] == usernameInput:
            hashed_passwordInput = hashlib.sha256(
                passwordInput.encode('utf-8')).hexdigest()
            print(hashed_passwordInput)
            if i["password"] == hashed_passwordInput:
                user = i

    if user == 0:
        return {"msg": "Wrong username or password"}, 401

    access_token = create_access_token(identity=usernameInput)
    response = {
        "access_token": access_token,
        "id": user["id"],
        "username": user["username"]
    }
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/get", methods=["GET"])
@jwt_required()
def get_events():
    all_events = Events.query.all()
    results = events_schema_many.dump(all_events)
    return jsonify(results)


@app.route("/get/<id>", methods=["GET"])
@jwt_required()
def get_event(id):
    event = Events.query.get(id)
    return events_schema.jsonify(event)


@app.route("/add", methods=["POST"])
@jwt_required()
def add_event():
    data = request.get_json()
    event = Events(name=data["name"], description=data["description"], location=data["location"],
                   type=data["type"], date=data["date"], startTime=data["startTime"], endTime=data["endTime"],
                   isFinal=data["isFinal"], institution_id=data["institution_id"])
    db.session.add(event)
    db.session.commit()
    response = events_schema.jsonify(event)
    return response


@app.route('/update/<id>', methods=["PUT"])
@jwt_required()
def update_event(id):
    data = request.get_json()
    event = Events.query.get(id)
    event.description = data["description"]
    event.name = data["name"]
    event.location = data["location"]
    event.type = data["type"]
    event.date = data["date"]
    event.startTime = data["startTime"]
    event.endTime = data["endTime"]
    event.isFinal = data["isFinal"]
    db.session.commit()
    response = events_schema.jsonify(event)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/delete/<id>', methods=["DELETE"])
@jwt_required()
def delete_event(id):
    event = Events.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return events_schema.jsonify(event)


@app.route("/getUsers", methods=["GET"])
@jwt_required()
def get_users():
    all_users = Users.query.all()
    result = users_schema_many.dump(all_users)
    return jsonify(result)


@app.route("/getMessages", methods=["GET"])
@jwt_required()
def get_messages():
    all_messages = Messages.query.all()
    resultMessages = messages_schema_many.dump(all_messages)
    return jsonify(resultMessages)


@socketio.on("connect")
def connected():
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


@socketio.on('data')
def handle_message(data):
    print("data from the front end: ", str(data["message"]))
    print(str(data["username"]), str(data["userId"]))

    message = Messages(
        institution_id=data["userId"], dateTime=data["datetime"], message=data["message"])
    db.session.add(message)
    db.session.commit()

    emit("data", {'username': data["username"], 'message': data["message"],
         'id': request.sid, 'userId': data["userId"]}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
