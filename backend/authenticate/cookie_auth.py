import hashlib
from typing import Optional

from fastapi import Request
from fastapi import Response

from authenticate.num_converter import try_int


auth_cookie_name = 'user_blog'

# Remember to change secure=True when deploying my program.
# Adjust to "None" with "secure=True" for production
# def set_auth(response: Response, user_id):
#     hash_val = __hash_pwd(str(user_id))
#     val = "{}:{}".format(user_id, hash_val)
#     response.set_cookie(
#         auth_cookie_name, val, secure=False, httponly=True, samesite="Lax"
#     )


def set_auth(response: Response, user_id):
    hash_val = __hash_pwd(str(user_id))
    val = "{}:{}".format(user_id, hash_val)
    response.set_cookie(
        key=auth_cookie_name,
        value=val,
        secure=False,
        httponly=True,
        samesite="Lax"
    )

def __hash_pwd(text: str) -> str:
    text = "miracle__" + text + "__blog"
    return hashlib.sha512(text.encode("utf-8")).hexdigest()


import logging

logger = logging.getLogger(__name__)

def get_user_id_via_auth_cookie(request: Request) -> Optional[int]:
    try:
        if auth_cookie_name not in request.cookies:
            return None

        val = request.cookies[auth_cookie_name]
        parts = val.split(":")
        if len(parts) != 2:
            return None

        user_id = parts[0]
        hash_val = parts[1]
        hash_val_check = __hash_pwd(user_id)
        if hash_val != hash_val_check:
            logger.warning("Hash mismatch, invalid cookie value")
            return None

        return try_int(user_id)
    except Exception as e:
        logger.error(f"Error while getting user ID from cookie: {e}")
        return None


def logout(response: Response):
    response.delete_cookie(auth_cookie_name)
