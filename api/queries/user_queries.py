import psycopg
from queries.pool import pool
from psycopg.rows import class_row
from typing import Optional
from models.users import UserWithPw, UserIn, UserOut, UserUpdate
from utils.exceptions import UserDatabaseException
from fastapi import HTTPException


class UserQueries:
    def get_by_username(self, username: str) -> UserWithPw:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error:
            raise UserDatabaseException(f"Error getting user {username}")
        return user


    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE id = %s
                            """,
                        [id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error:
            raise UserDatabaseException(f"Error getting user with id {id}")
        return user


    def create_user(self, username: UserIn, hashed_password: str) -> UserWithPw:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, username, password, date_of_birth, gender, phone)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            username.first_name,
                            username.last_name,
                            username.username,
                            hashed_password,
                            username.date_of_birth,
                            username.gender,
                            username.phone
                        ]
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username.username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {username.username}"
            )
        return user


    def update_user(self, user_id: int, user: UserUpdate, hashed_password: str) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET password = %s
                          , phone = %s
                        WHERE id = %s
                        """,
                        [
                            hashed_password,
                            user.phone,
                            user_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT
                            id, first_name, last_name, username, password, date_of_birth, gender, phone
                        FROM users

                        WHERE id = %s;
                        """,
                        [
                            user_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_user_out(record)
        except Exception:
            raise HTTPException(status_code=404, detail="Could not get user")


    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            username=record[3],
            password=record[4],
            confirmed_password=record[4],
            date_of_birth=record[5],
            gender=record[6],
            phone=record[7],
        )
