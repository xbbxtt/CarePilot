steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tokens (
            id SERIAL PRIMARY KEY NOT NULL,
            token TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tokens;
        """
    ],
]
