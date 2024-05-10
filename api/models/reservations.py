from pydantic import BaseModel
from datetime import date,time


class ReservationIn(BaseModel):
    insurance: str
    reason: str
    date: date
    time: time
    doctor_id: int


class ReservationOut(ReservationIn):
    id: int
    status: str
    meeting_url: str


class ReservationUpdate(BaseModel):
    insurance: str
    reason: str
    date: date
    time: time


class ReservationDrOut(ReservationIn):
    id: int
    status: str
    first_name: str
    last_name: str
    image: str
    meeting_url: str
