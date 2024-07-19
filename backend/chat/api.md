# Chat Endpoints

Based on https://youtube.com/playlist?list=PL_KegS2ON4s4jfxISory0aIOHyl8MlJtb&si=up-zUGBN-91XyjFU

## Get Message
- URL: `/<int:pk>/`
- Method: `GET`
- Success Response: 
  - `200`
    `[{id: int, user: int, sender: int, reciever: int, sender_profile: object, reciever_profile: object, message: string, is_read: bool, date: string}, ...]`
    - sender_profile and reciever_profile are the same objects as returned by `/accounts/profile/<int:user_id>`
- Error Response:
  - `404`
    `{"detail": "No Message matches the given query."}`

## Get All Messages
- URL: `/all`
- Method: `GET`
- Success Response:
  - `200`
    `[{id: int, user: int, sender: int, reciever: int, sender_profile: object, reciever_profile: object, message: string, is_read: bool, date: string}, ...]`
    - sender_profile and reciever_profile are the same objects as returned by `/accounts/profile/<int:user_id>`

## Get Messages Between Users
- URL: `/messages/<int:user_id>/<int:user_id>/`
- Method: `GET`
- Success Response:
  - `200`
    `[{id: int, user: int, sender: int, reciever: int, sender_profile: object, reciever_profile: object, message: string, is_read: bool, date: string}, ...]`
    - sender_profile and reciever_profile are the same objects as returned by `/accounts/profile/<int:user_id>`

## Send Message
- URL: `/send/`
- Method: `POST`
- Data Params: `{user: int, sender: int, reciever: int, message: string, is_read: bool}`
- Success Response:
  - `201`
    `[{id: int, user: int, sender: int, reciever: int, sender_profile: object, reciever_profile: object, message: string, is_read: bool, date: string}]`
    - sender_profile and reciever_profile are the same objects as returned by `/accounts/profile/<int:user_id>`
- Error Response:
  - `400`
    ```
    {
    "user": [
        "Invalid pk \"${user}\" - object does not exist."
    ],
    "sender": [
        "Invalid pk \"${sender}\" - object does not exist."
    ],
    "reciever": [
        "This field may not be null."
    ],
    "message": [
        "This field may not be blank."
    ]
    }
    ```
    - Above is a sample, individual fields may or may not be returned depending on the input

## Update Message
- URL: `/<int:pk>/`
- Method: `PUT`
- Data Params: `{user: int, sender: int, reciever: int, message: string, is_read: bool}`
- Success Response: 
  - `200`
    `[{id: int, user: int, sender: int, reciever: int, sender_profile: object, reciever_profile: object, message: string, is_read: bool, date: string}, ...]`
    - sender_profile and reciever_profile are the same objects as returned by `/accounts/profile/<int:user_id>`
- Error Response:
  - `400`
    ```
    {
    "user": [
        "Invalid pk \"${user}\" - object does not exist."
    ],
    "sender": [
        "Invalid pk \"${sender}\" - object does not exist."
    ],
    "reciever": [
        "This field may not be null."
    ],
    "message": [
        "This field may not be blank."
    ]
    }
    ```
    - Above is a sample, individual fields may or may not be returned depending on the input
  - `404`
    `{"detail": "No Message matches the given query."}`

## Delete Message
- URL: `/<int:pk>/`
- Method: `DELETE`
- Success Response:
  - `204`
    No response object
- Error Response
  - `404`
    `{"detail": "No Message matches the given query."}`
