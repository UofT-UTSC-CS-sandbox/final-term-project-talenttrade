# Post Endpoints

## Create Post

- URL: `/posts`
- Method: `POST`
- URL Params: None
- Data Params: `{author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}`
- Success Response:
  - `201`
    - Content: `{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}`
- Error Response:
  - `400` Bad Request
    - Content: `{"author_id": ["This field is required"], "need": ["This field may not be blank"], "offer": ["This field may not be blank"], "description": ["This field may not be blank"], "location": ["This field may not be blank"], "applicants": ["A valid integer is required"]}`

## List User's Posts

- URL: `/posts`
- Method: GET
- URL Params: None
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts found."}`
    - Result of giving an id that matches no existing posts

## Delete All Posts

- URL: `/posts`
- Method: DELETE
- URL Params: None
- Success Response:
  - `204`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts found."}`

## Retrieve, Update, or Destroy Post

- URL: `/posts/<int:pk>/`
- Method: GET, PUT, DELETE
- URL Params:
  - `pk` the id of the post.
- Success Responses:
  - GET:
    - `200`
      - Content: `{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}`
  - PUT
    - `200`
      - Content: `{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}`
  - DELETE:
    - `204`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Post matches the given query."}`

## Most Popular Need

- URL: `/posts/need/`
- Method: GET
- URL Params: None
- Success Response:
  - `200`
    - Content: `[{need: string, count: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Needs found."}`

## Most Popular Offer

- URL: `/posts/offer/`
- Method: GET
- URL Params: None
- Success Response:
  - `200`
    - Content: `[{offer: string, count: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Offers found."}`

## Most Popular Trade

- URL: `/posts/trade/`
- Method: GET
- URL Params: None
- Success Response:
  - `200`
    - Content: `[{need: string, offer: string, count: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Trades found."}`

## List Posts by Need

- URL: `/posts/post-need/`
- Method: GET
- URL Params:
  - `need`: the need to filter posts by.
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - 404 Not Found
    - Content: `{"detail": "No Posts found by need."}`

## List Posts by Offer

- URL: `/posts/post-offer/<str:offer>/<str:show>`
- Method: GET
- URL Params:
  - `offer`: the offer to filter posts by.
  - `show`: `true` if searching, otherwise `false`.
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts found by offer."}`

## List Posts by Trade

- URL: `/posts/post-trade/`
- Method: GET
- URL Params:
  - `offer`: the offer to filter posts by.
  - `need`: the need to filter posts by.
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts found by trade."}`

## Filter Posts

- URL: `/posts/filter/<str:pk>/<str:pk_list>/<str:offer_list>/<str:loc_coords>/<str:user_list>`
- Method: GET
- URL Params:
  - `pk`: the distance filter (in kilometers).
  - `pk_list`: list of post IDs to filter.
  - `offer_list`: list of offers to filter by.
  - `loc-coords`: String containing latitude and longitude of the location.
  - `user_list`: String containing a list of users to filter by
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts match the given query."}`

## Suggested Posts

- URL: `/posts/suggested-posts/`
- Method: GET
- URL Params: None
- Success Response:
  - `200`
    - Content: `[{id: int, author_id: int, author_name: string, need: string, offer: string, description: string, location: string, published: datetime, applicants: int}, ...]`
- Error Responses:
  - `400` Bad Request
  - `404` Not Found
    - Content: `{"detail": "No Posts match the given query."}`

## Record Post Click

- URL: `/posts/record-click/<int:post_id>`
- Method: GET, POST
- URL Params:
  - `post_id`: id of the post that is clicked.
- Success Response:
  - `201 Created`
    - Content: `{"message": "Click recorded"}`
- Error Responses:
  - `400` Bad Request
    - Content: `{"detail": "Invalid request data"}`
  - `404` Not Found
    - Content: `{"detail": "Post not found."}`
