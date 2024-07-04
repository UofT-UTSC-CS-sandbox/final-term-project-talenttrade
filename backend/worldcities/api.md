# API Documentation

## Base URL
`/worldcities`

## Endpoints

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
    },
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

