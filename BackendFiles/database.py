from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()


class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    type = db.Column(db.String(100))
    date = db.Column(db.Date)
    location = db.Column(db.String(100))
    startTime = db.Column(db.Time)
    endTime = db.Column(db.Time)
    isFinal = db.Column(db.Boolean)
    institution_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, name, description, type, date, location, startTime, endTime, isFinal, institution_id):
        self.name = name
        self.description = description
        self.type = type
        self.date = date
        self.location = location
        self.startTime = startTime
        self.endTime = endTime
        self.isFinal = isFinal
        self.institution_id = institution_id


class EventsSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "type", "date", "location",
                  "startTime", "endTime", "isFinal", "institution_id")


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
