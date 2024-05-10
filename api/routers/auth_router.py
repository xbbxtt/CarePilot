from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.user_queries import (
    UserQueries,
)
from utils.exceptions import UserDatabaseException
from models.users import (
    UserRequest,
    UserResponse,
    UserIn,
    UserResponseDetail,
    UserOut,
    UserUpdate
)
from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)


router = APIRouter(tags=["Authentication"], prefix="/api/auth")


@router.post("/signup")
async def signup(
    new_user: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    hashed_password = hash_password(new_user.password)
    try:
        user = queries.create_user(new_user, hashed_password)
    except UserDatabaseException:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    token = generate_jwt(user)
    user_out = UserResponse(**user.model_dump())
    secure = True if request.headers.get("origin") == "localhost" else False
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return user_out


@router.post("/signin")
async def signin(
    user_request: UserRequest,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponseDetail:
    user = queries.get_by_username(user_request.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    if not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = generate_jwt(user)
    secure = True if request.headers.get("origin") == "localhost" else False
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return UserResponseDetail(
        id=user.id,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        date_of_birth=user.date_of_birth,
        gender=user.gender,
        phone=user.phone
        )


@router.get("/authenticate")
async def authenticate(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: UserQueries = Depends(),
) -> UserResponseDetail | None:
    if user is None:
        return user
    user = queries.get_by_username(user.username)
    return user


@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    secure = True if request.headers.get("origin") == "localhost" else False
    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )
    return


@router.put("/update", response_model=UserOut)
def update_user(
    user: UserUpdate,
    repo: UserQueries = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> UserOut:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    if user.password != user.confirmed_password:
        raise HTTPException(status_code=422, detail="Passwords do not match")
    hashed_password = hash_password(user.password)
    current_user = repo.get_by_username(user_response.username)
    return repo.update_user(current_user.id, user, hashed_password)
