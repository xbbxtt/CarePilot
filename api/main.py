"""
Entry point for the FastAPI Application
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from routers import auth_router, reservations, doctors, zoom
import os
import requests.auth
from queries.pool import pool
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_origins=["*"],
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
