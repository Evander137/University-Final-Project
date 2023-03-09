import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:rootroot@localhost/szakdolgozat"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)


CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name


class EventsSchema(ma.Schema):
    class Meta:
        fields = ("id", "name")


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def __init__(self, email, password):
        self.email = email
        self.password = password


class UsersSchema(ma.Schema):
    class Meta:
        fields = ("id", "email", "password")


events_schema = EventsSchema()
events_schema_many = EventsSchema(many=True)
users_schema = UsersSchema()
users_schema_many = UsersSchema(many=True)


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
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "asd" or password != "asd":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/get", methods=["GET"])
def hello():
    all_events = Events.query.all()
    results = events_schema_many.dump(all_events)
    return jsonify(results)


@app.route("/get/<id>", methods=["GET"])
def get_event(id):
    event = Events.query.get(id)
    return events_schema.jsonify(event)


@app.route('/add', methods=["POST"])
def add_event():
    data = request.get_json()["name"]
    event = Events(data)
    db.session.add(event)
    db.session.commit()
    return events_schema.jsonify(event)


@app.route('/delete/<id>', methods=["DELETE"])
def delete_event(id):
    event = Events.query.get(id)
    db.session.delete(event)
    db.session.commit()
    return events_schema.jsonify(event)


@app.route('/update/<id>', methods=["PUT"])
def update_event(id):
    # data = request.get_json()["name"]
    event = Events.query.get(id)
    name = request.json["name"]
    event.name = name
    db.session.commit()
    response = events_schema.jsonify(event)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data': 'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ", str(data))
    emit("data", {'data': data, 'id': request.sid}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
