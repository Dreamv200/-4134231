from fastapi import FastAPI

app = FastAPI(title='Water Management Backend')

@app.get('/')
def read_root():
    return {'message': 'Water management backend is running'}
