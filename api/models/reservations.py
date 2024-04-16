from pydantic import BaseModel
from datetime import date,time


class ReservationIn(BaseModel):
    insurance: bool
    reason: str
    date: date
    time: time
    patient_id: int
    doctor_id: int
    status: str


class ReservationOut(ReservationIn):
    id: int


class ReservationUpdate(BaseModel):
    insurance: bool
    reason: str
    date: date
    time: time
