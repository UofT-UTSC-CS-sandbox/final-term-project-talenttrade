# Reviews Endpoints

## Get Reviews

- URL: `/reviews`
- Method: `GET`
- Success Response:
  - `200`
    `[{id: int, reviewer: int, receiver: int, review: string, published: string},...]`

## Get Specific Review

- URL: `/reviews/id`
- Method: `GET`
- URL Params:
  - `id` the id of the review
- Success Response:
  - `200`
    `[{id: int, reviewer: int, receiver: int, review: string, published: string},...]`
- Error Response:
  - `404`
    `{"detail": "No Review matches the given query."}`

## Get All Reviews for a User

- URL: `/reviews/all/?receiver=int&page=int`
- Method: `GET`
- URL Params:
  - `receiver` the user to get reviews for
  - `page` the page for the reviews
- Success Response:
  - `200`
    `[{review: string, published: string, pages: int},...]`
    - Returns (at most) 5 reviews at a time
  - `204`
    `[]`
    - Result of getting reviews where there are none


## Create Review

Requires Authentication

- URL: `/reviews`
- Method: `POST`
- Data Params: `{reviewer: int, receiver: int, review: string}`
- Success Response:
  - `201`
    `{id: int, reviewer: int, receiver: int, review: string, published: string}`
- Error Response:
  - `400`
    ```
    {
    "reviewer": [
        "This field may not be null."
    ],
    "receiver": [
        "Invalid pk \"${receiver}\" - object does not exist."
    ],
    "review": [
        "This field may not be blank."
    ]
    }
    ```
    - Above is a sample, individual fields may or may not be returned depending on the input

## Update Review

- URL: `/reviews/id`
- Method: `PUT`
- URL Params:
  - `id` the id of the review
- Data Params: `{reviewer: int, receiver: int, review: string}`
- Success Response:
  - `200`
    `[{id: int, reviewer: int, receiver: int, review: string, published: string},...]`
- Error Response:
  - `400`
    ```
    {
    "reviewer": [
        "Invalid pk \"${reviewer}\" - object does not exist."
    ],
    "receiver": [
        "This field may not be null."
    ],
    "review": [
        "This field may not be blank."
    ]
    }
    ```
    - Above is a sample, individual fields may or may not be returned depending on the input


## Delete Review

- URL: `/reviews/id`
- Method: `DELETE`
- URL Params:
  - `id` the id of the review
- Success Response:
  - `200`
    - No response object
- Error Response:
  - `404`
    `{"detail": "No Review matches the given query."}`
    - Result of giving an id that matches no existing review