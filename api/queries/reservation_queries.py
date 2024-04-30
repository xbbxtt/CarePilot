import psycopg
from queries.pool import pool
from psycopg.rows import class_row
from typing import Optional, Union, List
from models.users import UserWithPw, UserIn, UserOut, UserUpdate
from models.reservations import ReservationOut, ReservationIn, ReservationUpdate, ReservationDrOut
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

    def get_reservation(self, reservation_id: int) -> Optional[ReservationDrOut]:
        try:
            with pool.connection() as conn:

                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.insurance,
                            r.reason,
                            r.date,
                            r.time,
                            r.doctor_id,
                            r.status,
                            d.id,
                            d.first_name,
                            d.last_name
                            
                        FROM reservations r
                        INNER JOIN Doctors d ON r.Doctor_id = d.id
                        WHERE r.id = %s;
                        """,
                        [
                            reservation_id
                        ]
                    )
                    record = result.fetchone()
                    print("*********************")
                    print(record)
                    return self.record_to_reservation_dr_out(record)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not get reservation")

    def record_to_reservation_dr_out(self, record):
        return ReservationDrOut(
            id=record[0],
            insurance=record[1],
            reason=record[2],
            date=record[3],
            time=record[4],
            doctor_id=record[5],
            status=record[6],
            first_name=record[8],
            last_name=record[9],
        )

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


    def get_all_current_reservations(self) -> Union[Error, List[ReservationDrOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.insurance,
                            r.reason,
                            r.date,
                            r.time,
                            r.doctor_id,
                            r.status,
                            d.id,
                            d.first_name,
                            d.last_name
                            
                        FROM reservations r
                        INNER JOIN Doctors d ON r.Doctor_id = d.id
                        WHERE status=%s
                        ORDER BY date;
                        """,
                        ["current"]
                    )
                    return [
                        self.record_to_reservation_dr_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not get reservation")



    def get_all_completed_reservations(self) -> Union[Error, List[ReservationDrOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.insurance,
                            r.reason,
                            r.date,
                            r.time,
                            r.doctor_id,
                            r.status,
                            d.id,
                            d.first_name,
                            d.last_name
                            
                        FROM reservations r
                        INNER JOIN Doctors d ON r.Doctor_id = d.id
                        WHERE status=%s
                        ORDER BY date;
                        """,
                        ["completed"]
                    )
                    return [
                        self.record_to_reservation_dr_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not get reservation")

    def update_reservation(self, reservation_id: int, reservation: ReservationUpdate) -> Optional[ReservationDrOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    db.execute(
                        """
                        UPDATE reservations
                        SET insurance = %s
                            , reason = %s
                            , date = %s
                            , time = %s
                        WHERE id = %s
                        """,
                        [
                            reservation.insurance,
                            reservation.reason,
                            reservation.date,
                            reservation.time,
                            reservation_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.insurance,
                            r.reason,
                            r.date,
                            r.time,
                            r.doctor_id,
                            r.status,
                            d.id,
                            d.first_name,
                            d.last_name
                            
                        FROM reservations r
                        INNER JOIN Doctors d ON r.Doctor_id = d.id
                        WHERE r.id = %s;
                        """,
                        [
                            reservation_id
                        ]
                    )
                    record = result.fetchone()
                    print(record)
                    return self.record_to_reservation_dr_out(record)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not update reservation")

    def cancel_reservation(self, reservation_id: int) -> Optional[ReservationOut]:
        try:

            with pool.connection() as conn:

                with conn.cursor() as db:

                    cancel_status = "canceled"
                    db.execute(
                        """
                        UPDATE reservations
                        SET  status = %s
                        WHERE id = %s
                        """,
                        [
                            cancel_status,
                            reservation_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT
                            id, insurance, reason, date, time, patient_id, doctor_id, status
                        FROM reservations

                        WHERE id = %s;
                        """,
                        [
                            reservation_id
                        ]
                    )
                    record = result.fetchone()
                    print(record)
                    return self.record_to_reservation_out(record)
        except Exception as e:
            raise HTTPException(status_code=404, detail="Could not cancel reservation")

    def complete_reservation(self, reservation_id: int) -> Optional[ReservationOut]:
        try:

            with pool.connection() as conn:

                with conn.cursor() as db:

                    complete_status = "completed"
                    db.execute(
                        """
                        UPDATE reservations
                        SET  status = %s
                        WHERE id = %s
                        """,
                        [
                            complete_status,
                            reservation_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT
                            id, insurance, reason, date, time, patient_id, doctor_id, status
                        FROM reservations

                        WHERE id = %s;
                        """,
                        [
                            reservation_id
                        ]
                    )
                    record = result.fetchone()
                    print(record)
                    return self.record_to_reservation_out(record)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not complete reservation")
