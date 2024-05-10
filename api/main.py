from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth_router, reservations, doctors, zoom


app = FastAPI()

origins = ["CORS_HOST", "http://localhost:5173", "https://zoom.us"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(reservations.router, tags=["Reservations"])
app.include_router(doctors.router, tags=["Doctors"])
app.include_router(zoom.router, tags=["Zoom"])


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
