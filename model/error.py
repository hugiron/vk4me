class InternalServerError(Exception):
    def __init__(self, message):
        super(message)
        self.code = 500