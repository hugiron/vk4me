class InternalServerError(Exception):
    def __init__(self, message):
        super(InternalServerError, self).__init__(message)
        self.code = 500