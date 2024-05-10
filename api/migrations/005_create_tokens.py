steps = [
    [
        """
        CREATE TABLE tokens (
            id SERIAL PRIMARY KEY NOT NULL,
            token TEXT NOT NULL
        );
        """,
        """
        DROP TABLE tokens;
        """
    ],
]
