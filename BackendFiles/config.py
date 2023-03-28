from datetime import timedelta


SECRET_KEY = 'gigaSecretKulcs!'
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:rootroot@localhost/szakdolgozat"
SQLALCHEMY_TRACK_MODIFICATIONS = False

JWT_SECRET_KEY = "gigaSecretKulcs!"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
