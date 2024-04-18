import psycopg
from queries.pool import pool
from psycopg.rows import class_row
from typing import Optional, Union
from models.users import UserWithPw, UserIn, UserOut, UserUpdate
from models.reservations import ReservationOut, ReservationIn, ReservationUpdate
from utils.exceptions import UserDatabaseException
from models.errors import Error
from fastapi import HTTPException


class ReservationRepository:
    def create(self, reservation: ReservationIn, user_id: int) -> Union[ReservationOut, Error]:
        try:

            with pool.connection() as conn:

                with conn.cursor() as db:
                    default_status = "current"
                    result = db.execute(
                        """
                        INSERT INTO reservations
                            (insurance, reason, date, time, patient_id, doctor_id, status)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            reservation.insurance,
                            reservation.reason,
                            reservation.date,
                            reservation.time,
                            user_id,
                            reservation.doctor_id,
                            default_status
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.reservation_in_to_out(id, reservation, default_status)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=401, detail="Create did not work")

    def reservation_in_to_out(self, id: int, reservation: ReservationIn, status: str):
        old_data = reservation.dict()
        return ReservationOut(id=id, status=status, **old_data)

    def get_reservation(self, reservation_id: int) -> Optional[ReservationOut]:
        try:
            with pool.connection() as conn:

                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT
                            id,
                            insurance,
                            reason,
                            date,
                            time,
                            patient_id,
                            doctor_id,
                            status

                        FROM reservations

                        WHERE id = %s;
                        """,
                        [
                            reservation_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_reservation_out(record)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not get reservation")

    def record_to_reservation_out(self, record):
        return ReservationOut(
            id=record[0],
            insurance=record[1],
            reason=record[2],
            date=record[3],
            time=record[4],
            doctor_id=record[6],
            status=record[7],
        )
