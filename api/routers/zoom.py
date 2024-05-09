from fastapi import Request, APIRouter
from fastapi.responses import RedirectResponse
import requests.auth
from queries.pool import pool
import json


router = APIRouter()


@router.get("/zoom")
def authorize_zoom(request: Request):

    full_authorization_url = f"https://zoom.us/oauth/authorize?response_type=code&client_id=OAwVjWjqQIGaSCrCpzprAw&redirect_uri=http://localhost:8000/callback"

    return RedirectResponse(url=full_authorization_url)


@router.get("/callback")
def get_token(code):
    CLIENT_ID = "OAwVjWjqQIGaSCrCpzprAw"
    CLIENT_SECRET = "L7NJbej3HQUJuJTuKXexq7AulrRyUX0h"
    REDIRECT_URI = "http://localhost:8000/callback"
    client_auth = requests.auth.HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET)
    post_data = {"grant_type": "authorization_code",
                 "code": code,
                 "redirect_uri": REDIRECT_URI}

    response = requests.post("https://zoom.us/oauth/token",
                             auth=client_auth,
                             data=post_data)
    token_json = response.json()
    token = token_json["access_token"]
    print(token)

    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE tokens
                    SET token = %s
                    WHERE id = 1;
                    """,
                    [
                        token,
                    ]
                )
    except Exception:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO tokens
                        (token)
                    VALUES
                        (%s);
                    """,
                    [
                        token,
                    ]
                )

    return token


meeting_detials = {
  "agenda": "My Meeting",
  "default_password": False,
  "duration": 60,
  "password": "",
  "pre_schedule": False,
  "recurrence": {
    "end_date_time": "2022-04-02T15:59:00Z",
    "end_times": 7,
    "monthly_day": 1,
    "monthly_week": 1,
    "monthly_week_day": 1,
    "repeat_interval": 1,
    "type": 1,
    "weekly_days": "1"
  },

  "settings": {
    "additional_data_center_regions": [
      "TY"
    ],
    "allow_multiple_devices": True,
    "alternative_hosts": "",
    "alternative_hosts_email_notification": True,
    "approval_type": 2,
    "approved_or_denied_countries_or_regions": {
      "approved_list": [
        "CX"
      ],
      "denied_list": [
        "CA"
      ],
      "enable": False,
      "method": "approve"
    },
    "audio": "telephony",
    "audio_conference_info": "test",
    "authentication_domains": "example.com",
    "authentication_exception": [
      {
        "email": "jchill@example.com",
        "name": "Jill Chill"
      }
    ],
    "auto_recording": "cloud",
    "breakout_room": {
      "enable": True,
      "rooms": [
        {
          "name": "room1",
          "participants": [
            "jchill@example.com"
          ]
        }
      ]
    },
    "calendar_type": 1,
    "close_registration": False,
    "contact_email": "jchill@example.com",
    "contact_name": "Jill Chill",
    "email_notification": True,
    "encryption_type": "enhanced_encryption",
    "focus_mode": True,
    "global_dial_in_countries": [

    ],
    "host_video": True,
    "jbh_time": 0,
    "join_before_host": True,
    "language_interpretation": {
      "enable": True,
      "interpreters": [
        {
          "email": "interpreter@example.com",
          "languages": "US,FR"
        }
      ]
    },
    "sign_language_interpretation": {
      "enable": True,
      "interpreters": [
        {
          "email": "interpreter@example.com",
          "sign_language": "American"
        }
      ]
    },
    "meeting_authentication": True,
    "meeting_invitees": [
      {
        "email": "jchill@example.com"
      }
    ],
    "mute_upon_entry": False,
    "participant_video": False,
    "private_meeting": False,
    "registrants_confirmation_email": False,
    "registrants_email_notification": False,
    "registration_type": 1,
    "show_share_button": True,
    "use_pmi": False,
    "waiting_room": False,
    "watermark": False,
    "host_save_video_order": True,
    "alternative_host_update_polls": True,
    "internal_meeting": False,
    "continuous_meeting_chat": {
      "enable": True,
      "auto_add_invited_external_users": True
    },
    "participant_focused_meeting": False,
    "push_change_to_calendar": False,
    "resources": [
      {
        "resource_type": "whiteboard",
        "resource_id": "X4Hy02w3QUOdskKofgb9Jg",
        "permission_level": "editor"
      }
    ],
    "auto_start_meeting_summary": False,
    "auto_start_ai_companion_questions": False
  },
  "start_time": "2022-03-25T07:32:55Z",
  "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
  "timezone": "America/Los_Angeles",
  "topic": "My Meeting",
  "tracking_fields": [
    {
      "field": "field1",
      "value": "value1"
    }
  ],
  "type": 2
}



def create_meeting():

    with pool.connection() as conn:
        with conn.cursor() as db:
            result = db.execute(
                """
                SELECT token
                FROM tokens
                WHERE id = 1;
                """,
            )
            token = result.fetchone()[0]
            print("----------------------------------", token)

    headers= {"Authorization": "bearer " + token, 'content-type': 'application/json'}
    response = requests.post("https://api.zoom.us/v2/users/me/meetings", headers=headers, data=json.dumps(meeting_detials))
    print("+++++++++++++++++++++++++++++++++++", response)
    meeting = response.json()
    print("+++++++++++++++++++++++++++++++++++", meeting)
    start_url = meeting["start_url"]
    join_url = meeting["join_url"]
    print("+++++++++++++++++++++++++++++++++++", join_url)
    print("==================================", start_url)

    return join_url


@router.get("/url")
def url():
    url = create_meeting()
    return url
