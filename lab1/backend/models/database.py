class Database:
    def __init__(self):
        self.water = {'status': 'Normal', 'pressure': '72 psi', 'flowRate': '120 L/min'}
        self.maintenance = [
            {'id': 1, 'task': 'Valve inspection', 'status': 'Completed', 'date': '2026-06-28'},
            {'id': 2, 'task': 'Pipe leak check', 'status': 'In Progress', 'date': '2026-06-30'},
        ]
