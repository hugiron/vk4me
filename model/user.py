from hashlib import sha256

class User:
    def __init__(self, login, password, email, rate=0, timestamp=2147483647):
        self.login = login
        self.password = password
        self.email = email
        self.rate = rate
        self.timestamp = timestamp

    @staticmethod
    def get_password(password):
        return sha256(password.encode()).hexdigest()