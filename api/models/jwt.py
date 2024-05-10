from pydantic import BaseModel


class JWTUserData(BaseModel):
    id: int
    username: str


# This represents the payload stored inside the JWT
class JWTPayload(BaseModel):
    user: JWTUserData
    sub: str
    exp: int
