from fastapi import APIRouter

router = APIRouter()

@router.get('/maintenance')
def get_maintenance():
    return [
        {'id': 1, 'task': 'Valve inspection', 'status': 'Completed', 'date': '2026-06-28'},
        {'id': 2, 'task': 'Pipe leak check', 'status': 'In Progress', 'date': '2026-06-30'},
    ]
