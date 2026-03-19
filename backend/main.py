from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Geo-Spatial Civic Platform Running 🚀"}