from pydantic import BaseModel
from datetime import date,time


class ReservationIn(BaseModel):
    insurance: bool
    reason: str
    date: date
    time: time
    doctor_id: int



class ReservationOut(ReservationIn):
    id: int
    status: str


class ReservationUpdate(BaseModel):
    insurance: bool
    reason: str
    date: date
    time: time
