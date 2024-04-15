steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            username VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(30) NOT NULL,
            confirmed_password VARCHAR(30) NOT NULL,
            date_of_birth TIMESTAMP NOT NULL,
            gender VARCHAR(30) NOT NULL,
            phone VARCHAR(12) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
