# Ratings Endpoints

## Get Ratings

- URL: `/ratings`
- Method: `GET`
- Success Response:
  - `200`
    `[{id: int, rater: int, receiver: int, rating: int},...]`

## Get Specific Rating

- URL: `/ratings/id`
- Method: `GET`
- URL Params:
  - `id` the id of the rating
- Success Response:
  - `200`
    `[{id: int, rater: int, receiver: int, rating: int},...]`
- Error Response:
  - `404`
    `{"detail": "No Rating matches the given query."}`

## Get Average Rating

- URL: `/ratings/?receiver=int`
- Method: `GET`
- URL Params:
  - `receiver` is the user to get the average for
- Success Response:
  - `200`
    `{"average": float}`
    - returns 0 if there are no reviews or user doesn't exist

## Get Rating a User Gave to Another User

- URL: `/ratings/rating/?rater=int&receiver=int`
- Method: `GET`
- URL Params:
  - `rater` the user who gave the rating
  - `receiver` the user to get rating for
- Success Response:
  - `200`
    `[{id: int, rater: int, receiver: int, rating: int}]`

## Create Rating

- URL: `/ratings`
- Method: `POST`
- Data Params: `{rater: int, receiver: int, rating: int}`
  <<<<<<< HEAD
  - # 0 < rating < 6
  - 0 < rating < 6
    > > > > > > > dev
- Success Response:
  - `201`
    `{id: int, rater: int, receiver: int, rating: int}`
- Error Response:
  - `400`
    ```
    {
    "rater": [
        "Invalid pk \"${rater}\" - object does not exist."
    ],
    "receiver": [
        "This field may not be null."
    ],
    "rating": [
        "Ensure this value is less than or equal to 5."
    ]
    }
    ```
    - Above is a sample, individual fields may or may not be returned depending on the input

## Update Rating

- URL: `/ratings/id`
- Method: `PUT`
- URL Params:
  - `id` the id of the rating
- Data Params: `{rater: int, receiver: int, rating: int}`
- Success Response:
  - `200`
    `{id: int, rater: int, receiver: int, rating: int}`
- Error Response:
- `400`
  ```
  {
  "rater": [
      "Invalid pk \"${rater}\" - object does not exist."
  ],
  "receiver": [
      "This field may not be null."
  ],
  "rating": [
      "Ensure this value is less than or equal to 5."
  ]
  }
  ```
  - Above is a sample, individual fields may or may not be returned depending on the input

## Delete Rating

- URL: `/ratings/id`
- Method: `DELETE`
- URL Params:
  - `id` the id of the rating
- Success Response:
  - `200`
    - No response object
- Error Response:
  - `404`
    `{"detail": "No Rating matches the given query."}`
    - Result of giving an id that matches no existing rating

## Get Users with Rating Above min_rating

- URL: `/ratings/users-with-rating/<str:min_rating>`
- Method: `POST`
- URL Params:
  - `min_rating`: minimum average rating to filter users.
- Success Response:
  - `200 `
  ```json
    ["<user_id1>", "<user_id2>",... ]
  ```
- Error Response:
  - Code: `400`
  ```json
  { "error": "Rating parameter is required" }
  ```
