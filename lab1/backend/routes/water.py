from fastapi import APIRouter

router = APIRouter()

@router.get('/water')
def get_water():
    return {'status': 'Normal', 'pressure': '72 psi', 'flowRate': '120 L/min'}
