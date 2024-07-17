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

**URL**: `/search-user/<str:username>/`  
**Method**: `GET`  
**URL Parameters**: `username` (string)

**Success Response**:

- **Code**: 200 OK
- **Content**:
  ```json
  [
    {
      "id": "<user_id>",
      "username": "<username>"
      // Other user details
    }
    // More users
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
    // Profile details
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
    // Profile details
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
**URL Params**: None  
**Query Params**:

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
**URL Params**: None  
**Query Params**:

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

**URL**: `/posts/filter/<str:pk>/<str:pk_list>/<str:offer_list>`  
**Method**: `GET`  
**URL Params**:

- `pk`: the distance filter (in kilometers).
- `pk_list`: list of post IDs to filter.
- `offer_list`: list of offers to filter by.
- `loc-coords`: String containing latitude and longitude of the location.

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
  {"detail": "Post not found."}
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
