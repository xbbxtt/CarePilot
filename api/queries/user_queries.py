"""
Database Queries for Users
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, Union
from models.users import UserWithPw, UserIn, UserOut
from utils.exceptions import UserDatabaseException
from models.errors import Error
from fastapi import HTTPException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
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
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
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
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return user

    def create_user(self, username: str, hashed_password: str) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            password
                        ) VALUES (
                            %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            username,
                            hashed_password,
                        ],
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {username}"
            )
        return user

class UserRepository:
    def create(self, user: UserIn, hashed_password: str) -> Union[UserOut, Error]:
        try:

            with pool.connection() as conn:

                with conn.cursor() as db:

                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, username, password, date_of_birth, gender, phone)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            hashed_password,
                            user.date_of_birth,
                            user.gender,
                            user.phone
                        ]
                    )
                    id = result.fetchone()[0]

                    return self.user_in_to_out(id, user)
        except Exception:
            raise HTTPException(status_code=401, detail="Create did not work")

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)

    def get_user(self, user_id: int) -> Optional[UserOut]:
        try:

            with pool.connection() as conn:

                with conn.cursor() as db:

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
                    if record is None:
                        return None

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
