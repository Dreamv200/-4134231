import os

class Settings:
    def __init__(self):
        self.api_port = int(os.getenv('API_PORT', '8000'))
