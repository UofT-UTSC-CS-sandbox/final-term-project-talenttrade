# API Documentation

## Base URL
`/accounts`


## Endpoints

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
      "username": "<username>",
      // Other user details
    },
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
