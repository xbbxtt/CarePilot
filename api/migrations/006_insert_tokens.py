steps = [
    [
        """
        INSERT INTO tokens (token)
        VALUES ('inticialtoken')
        ;
        """,
        """
        DELETE FROM tokens
        WHERE id = 1;
        """
    ],
]
