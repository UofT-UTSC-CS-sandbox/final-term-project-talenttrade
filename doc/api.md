# API Documentation

## Accounts Endpoints

## Base URL for Accounts

`/accounts`

### 1. Get Current User ID

**URL**: `/get-current-user-id/`  
**Method**: `GET`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "user_id": "<user_id>",
    "user_name": "<user_name>"
  }
  ```

**Error Response(s)**: None

### 2. Signup

**URL**: `/signup/`  
**Method**: `POST`  
**URL Parameters**: None

**Success Response**:

- **Code**: 201 Created
- **Content**:
  ```json
  {
    "message": "User creation successful"
  }
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "<error_details>"
  }
  ```

### 3. Login

**URL**: `/login/`  
**Method**: `POST`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "message": "Login successful"
  }
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "Invalid Credentials"
  }
  ```

### 4. Logout

**URL**: `/logout/`  
**Method**: `POST`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "Refresh token must be provided"
  }
  ```
- **Code**: 401 Unauthorized
- **Content**:
  ```json
  {
    "error": "User is not logged in"
  }
  ```

### 5. Search User by Username

**URL**: `/search-user/<str:username>/<str:user_list>`  
**Method**: `GET`  
**URL Parameters**:

- `username` (string): the username to search for
- `user_list` (string of a list): the userids to filter by

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  [
    {
      "id": "<user_id>",
      "username": "<username>",
      "email": "string",
      "first_name": "string",
      "last_name": "string"
    } ,
    ...
  ]
  ```

**Error Response(s)**: None

### 6. Create Profile

**URL**: `/profile/create/`  
**Method**: `POST`  
**URL Parameters**: None

**Success Response**:

- **Code**: 201 Created
- **Content**:
  ```json
  {
    "message": "Profile creation successful"
  }
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "<error_details>"
  }
  ```

### 7. Update Profile

**URL**: `/profile/`  
**Method**: `PUT`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "message": "Profile update successful"
  }
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "<error_details>"
  }
  ```

### 8. View Profile

**URL**: `/profile/<int:user_id>/`  
**Method**: `GET`  
**URL Parameters**: `user_id` (integer)

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "user": "int",
    "bio": "string",
    "location_name": "string",
    "location_coords": "string",
    "is_exact_location": "Boolean",
    "date_of_birth": "Date",
    "profile_picture": "image",
    "offerings": "string"
  }
  ```

**Error Response(s)**:

- **Code**: 404 Not Found
- **Content**:
  ```json
  {
    "error": "Profile not found"
  }
  ```

### 9. View Profile Without ID

**URL**: `/profile/`  
**Method**: `GET`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "user": "int",
    "bio": "string",
    "location_name": "string",
    "location_coords": "string",
    "is_exact_location": "Boolean",
    "date_of_birth": "Date",
    "profile_picture": "image",
    "offerings": "string"
  }
  ```

**Error Response(s)**:

- **Code**: 404 Not Found
- **Content**:
  ```json
  {
    "error": "Profile not found"
  }
  ```

### 10. Delete Profile

**URL**: `/profile/delete/`  
**Method**: `DELETE`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  {
    "message": "Profile deletion successful"
  }
  ```

**Error Response(s)**: None

### 11. Get List Of All Users

**URL**: `/users/`  
**Method**: `GET`  
**URL Parameters**: None

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  [
    "<user_id1>", "<user_id2>", ...
  ]
  ```

**Error Response(s)**: None

## Post Endpoints

### 1. Create Post

**URL**: `/posts`  
**Method**: `POST`  
**URL Params**: None  
**Data Params**:

```json
{
  "author_id": "int",
  "author_name": "string",
  "need": "string",
  "offer": "string",
  "description": "string",
  "location": "string",
  "published": "datetime",
  "applicants": "int"
}
```

**Success Response**:

- **Code**: `201`
  - **Content**:
  ```json
  {
    "id": "int",
    "author_id": "int",
    "author_name": "string",
    "need": "string",
    "offer": "string",
    "description": "string",
    "location": "string",
    "published": "datetime",
    "applicants": "int"
  }
  ```

**Error Response**:

- **Code**: `400` Bad Request
  - **Content**:
  ````json
  {"author_id": ["This field is required"], "need": ["This field may not be blank"], "offer": ["This field may not be blank"], "description": ["This field may not be blank"], "location": ["This field may not be blank"], "applicants": ["A valid integer is required"]}```
  ````

### 2. List User's Posts

**URL**: `/posts`  
**Method**: `GET`  
**URL Params**: None

**Success Response**:

- **Code** `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Posts found." }
  ```
  - Result of giving an id that matches no existing posts

### 3. Delete All Posts

**URL**: `/posts`  
**Method**: `DELETE`  
**URL Params**: None

**Success Response**:

- **Code**: `204`

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Posts found." }
  ```

### 4. Retrieve, Update, or Destroy Post

**URL**: `/posts/<int:pk>/`  
**Method**: GET, PUT, DELETE  
**URL Params**:

- `pk` the id of the post.

**Success Responses**:

- **GET**:

  - **Code**: `200 OK`
    - **Content**:
    ```json
    {
      "id": "int",
      "author_id": "int",
      "author_name": "string",
      "need": "string",
      "offer": "string",
      "description": "string",
      "location": "string",
      "published": "datetime",
      "applicants": "int"
    }
    ```

  ```

  ```

- **PUT**

  - `200`
    - Content:
    ```json
    {
      "id": "int",
      "author_id": "int",
      "author_name": "string",
      "need": "string",
      "offer": "string",
      "description": "string",
      "location": "string",
      "published": "datetime",
      "applicants": "int"
    }
    ```

- **DELETE**:
  - **Code**: `204`

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Post matches the given query." }
  ```

### 5. Most Popular Need

**URL**: `/posts/need/`  
**Method**: `GET`  
**URL Params**: None

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"need": "string", "count": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Needs found." }
  ```

### 6. Most Popular Offer

**URL**: `/posts/offer/`  
**Method**: `GET`  
**URL Params**: None

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"offer": "string", "count": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**:`404` Not Found
  - **Content**:
  ```json
  { "detail": "No Offers found." }
  ```

### 7. Most Popular Trade

**URL**: `/posts/trade/`  
**Method**: `GET`  
**URL Params**: None

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"need": "string", "offer": "string", "count": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Trades found." }
  ```

### 8. List Posts by Need

**URL**: `/posts/post-need/`  
**Method**: `GET`  
**URL Params**:

- `need`: the need to filter posts by.

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: 404 Not Found
  - **Content**:
  ```json
  { "detail": "No Posts found by need." }
  ```

### 9. List Posts by Offer

**URL**: `/posts/post-offer/<str:offer>/<str:show>`  
**Method**: `GET`  
**URL Params**:

- `offer`: the offer to filter posts by.
- `show`: `true` if searching, otherwise `false`.

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Posts found by offer." }
  ```

### 10. List Posts by Trade

**URL**: `/posts/post-trade/`  
**Method**: `GET`  
**URL Params**:

- `offer`: the offer to filter posts by.
- `need`: the need to filter posts by.

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**: `404` Not Found
  - **Content**:
  ```json
  { "detail": "No Posts found by trade." }
  ```

### 11. Filter Posts

**URL**: `/posts/filter/<str:pk>/<str:pk_list>/<str:offer_list>/<str:loc_coords>/<str:user_list>`
**Method**: `GET`  
**URL Params**:

- `pk`: the distance filter (in kilometers).
- `pk_list`: list of post IDs to filter.
- `offer_list`: list of offers to filter by.
- `loc-coords`: String containing latitude and longitude of the location.
- `user_list`: String containing a list of users to filter by

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `400` Bad Request
- **Code**:`404` Not Found
  - **Content**:
  ```json
  { "detail": "No Posts match the given query." }
  ```

### 12. Suggested Posts

**URL**: `/posts/suggested-posts/`
**Method**: GET
**URL Params**: None

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "author_id": "int", "author_name": "string", "need": "string", "offer": "string", "description": "string", "location": "string", "published": "datetime", "applicants": "int"}, ...]
  ```

**Error Responses**:

- **Code**: `401` Unauthorized
  - **Content**:
    ```json
    { "detail": "Authentication credentials were not provided." }
    ```
- **Code**:`500 ` Internal Server Error
  - **Content**:
  ```json
  { "detail": "Internal server error occurred." }
  ```

### 13. Record Post Click

**URL**: `/posts/record-click/<int:post_id>`
**Method**: GET, POST
**URL Params**:

- `post_id`: id of the post that is clicked.

**Success Response**:

- **Code**: `201 Created`
- **Content**:

```json
   {"message": "Click recorded"}`
```

**Error Responses**:

- **Code**:`400 ` Bad Request
  - **Content**:
  ```json
  { "detail": "Invalid request dat." }
  ```
- **Code**:`404` Not Found
  **Content**:
  ```json
  { "detail": "Post not found." }
  ```

## Ratings Endpoints

### 1. Get Ratings

**URL**: `/ratings`  
**Method**: `GET`

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "int",
        "rater": "int",
        "receiver": "int",
        "rating": "int"
      },
      ...
    ]
    ```

### 2. Get Specific Rating

**URL**: `/ratings/<int:id>`  
**Method**: `GET`  
**URL Params**:

- `id`: the id of the rating

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "int",
      "rater": "int",
      "receiver": "int",
      "rating": "int"
    }
    ```

**Error Response**:

- **Code**: `404` Not Found
  - **Content**:
    ```json
    {
      "detail": "No Rating matches the given query."
    }
    ```
  - **Condition**: This occurs when there is no rating with the specified ID.

### 3. Get Average Rating

**URL**: `/ratings/?receiver=<int:receiver>`  
**Method**: `GET`  
**URL Params**:

- `receiver`: the user to get the average rating for

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "average": "float"
    }
    ```
  - **Returns**: `0` if there are no reviews or if the specified user doesn't exist

**Error Response**:

- **Code**: `404` Not Found
  - **Content**:
    ```json
    {
      "detail": "No Ratings found for the specified receiver."
    }
    ```
  - **Condition**: This occurs when there are no ratings available for the specified receiver.

### 4. Get Rating a User Gave to Another User

**URL**: `/ratings/rating/?rater=<int:rater>&receiver=<int:receiver>`  
**Method**: `GET`  
**URL Params**:

- `rater`: the user who gave the rating
- `receiver`: the user to get rating for

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "int",
        "rater": "int",
        "receiver": "int",
        "rating": "int"
      }
    ]
    ```

**Error Response**:

- **Code**: `404` Not Found
  - **Content**:
    ```json
    {
      "detail": "No Rating found for the specified rater and receiver."
    }
    ```
  - **Condition**: This occurs when there is no rating found for the spe

### 5. Create Rating

**URL**: `/ratings`  
**Method**: `POST`  
**Data Params**:

```json
{
  "rater": "int",
  "receiver": "int",
  "rating": "int"
}
```

**Success Response**:

- **Code**: `201`
  - **Content**:
  ```json
  { "id": "int", "rater": "int", "receiver": "int", "rating": "int" }
  ```

**Error Response**:

- **Code**: `400`
  - **Content**:

```json
{
  "rater": ["Invalid pk \"${rater}\" - object does not exist."],
  "receiver": ["This field may not be null."],
  "rating": ["Ensure this value is less than or equal to 5."]
}
```

- Above is a sample, individual fields may or may not be returned depending on the input

### 6. Update Rating

**URL**: `/ratings/<int:id>`  
**Method**: `PUT`  
**URL Params**:

- `id`: the id of the rating to update

**Data Params**:

```json
{
  "rater": "int",
  "receiver": "int",
  "rating": "int"
}
```

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  { "id": "int", "rater": "int", "receiver": "int", "rating": "int" }
  ```

**Error Response**:

- **Code**:`400`
  - **Content**:

```json
{
  "rater": ["Invalid pk \"${rater}\" - object does not exist."],
  "receiver": ["This field may not be null."],
  "rating": ["Ensure this value is less than or equal to 5."]
}
```

- Above is a sample, individual fields may or may not be returned depending on the input

### 7. Delete Rating

**URL**: `/ratings/<int:id>`  
**Method**: `DELETE`  
**URL Params**:

- `id`: the id of the rating to delete

**Success Response**:

- **Code**: `200 OK`
  - **Content**: No response object

**Error Response**:

- **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
      "detail": "No Rating matches the given query."
    }
    ```
  - **Condition**: This occurs when there is no rating with the specified ID.

### 8. Get Users with Rating Above min_rating

**URL**: `/ratings/users-with-rating/<str:min_rating>`  
**Method**: `POST`  
**URL Params**:

- `min_rating`: minimum average rating to filter users.

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
    ["<user_id1>", "<user_id2>",... ]
  ```

**Error Response**:

- **Code**: `400 Bad Request`
  - **Content**:

```json
{ "error": "Rating parameter is required" }
```

## Reviews Endpoints

### 1. Get Reviews

**URL**: `/reviews`  
**Method**: `GET`

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "int",
        "reviewer": "int",
        "receiver": "int",
        "review": "string",
        "published": "string"
      },
      ...
    ]
    ```

### 2. Get Specific Review

**URL**: `/reviews/<int:id>`  
**Method**: `GET`  
**URL Params**:

- `id`: the id of the review

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "int",
      "reviewer": "int",
      "receiver": "int",
      "review": "string",
      "published": "string"
    }
    ```

**Error Response**:

- **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
      "detail": "No Review matches the given query."
    }
    ```
  - **Condition**: This occurs when there is no review with the specified ID.

### 3. Get All Reviews for a User

**URL**: `/reviews/all/?receiver=<int:receiver>&page=<int:page>`  
**Method**: `GET`  
**URL Params**:

- `receiver`: the user to get reviews for
- `page`: the page number for pagination

**Success Response**:

- **Code**: `200 OK`

  - **Content**:
    ```json
    [
      {
        "review": "string",
        "published": "string",
        "pages": "int"
      },
      ...
    ]
    ```
  - **Details**: Returns (at most) 5 reviews per page

- **Code**: `204 No Content`
  - **Content**: `[]`
  - **Details**: Indicates no reviews found for the specified user on the given page.

**Error Response**: None

### 4. Create Review

**URL**: `/reviews`  
**Method**: `POST`  
**Data Params**:

```json
{
  "reviewer": "int",
  "receiver": "int",
  "review": "string"
}
```

**Success Response**:

- **Code**: `201`
  - **Content**:
  ```json
  {
    "id": "int",
    "reviewer": "int",
    "receiver": "int",
    "review": "string",
    "published": "string"
  }
  ```

**Error Response**:

- **Code**:`400`
  - **Content**:
  ```json
  {
    "reviewer": ["This field may not be null."],
    "receiver": ["Invalid pk \"${receiver}\" - object does not exist."],
    "review": ["This field may not be blank."]
  }
  ```
  - Above is a sample, individual fields may or may not be returned depending on the input

### 5. Update Review

**URL**: `/reviews/<int:id>`  
**Method**: `PUT`  
**URL Params**:

- `id`: the id of the review to update

**Data Params**:

```json
{
  "reviewer": "int",
  "receiver": "int",
  "review": "string"
}
```

**Success Response**:

- **Code**: `200 OK`
  - **Content**:
  ```json
  [{"id": "int", "reviewer": "int", "receiver": "int", "review": "string", "published": "string"},...]
  ```

**Error Response**:

- **Code**: `400`
  - **Content**:
  ```json
  {
    "reviewer": ["Invalid pk \"${reviewer}\" - object does not exist."],
    "receiver": ["This field may not be null."],
    "review": ["This field may not be blank."]
  }
  ```
  - Above is a sample, individual fields may or may not be returned depending on the input

### 6. Delete Review

**URL**: `/reviews/<int:id>`  
**Method**: `DELETE`  
**URL Params**:

- `id`: the id of the review to delete

**Success Response**:

- **Code**: `200 OK`
  - **Content**: No response object

**Error Response**:

- **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
      "detail": "No Review matches the given query."
    }
    ```
  - **Condition**: This occurs when there is no review with the specified ID.

## WorldCities Endpoints

## Base URL for WorldCities

`/worldcities`

### 1. City Search

**URL**: `/search/`  
**Method**: `GET`  
**URL Parameters**:

- `q`: The query string to search for cities (required).

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  [
    {
      "id": "<city_id>",
      "name": "<city_name>",
      "lat": "<latitude>",
      "lng": "<longitude>"
    }
    // Up to 4 more cities
  ]
  ```

**Error Response(s)**:

- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "No query provided"
  }
  ```

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
