steps = [
    [
        """
        CREATE TABLE doctors (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            specialty VARCHAR(30) NOT NULL,
            image TEXT NOT NULL
        );
        """,
        """
        DROP TABLE doctors;
        """
    ],
]
