# API Documentation

## Endpoint: `/users/register`

### Method: `POST`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a user in the database, and returns an authentication token along with the user details.

---

### Request Body
The request body must be in JSON format and include the following fields:

| Field               | Type     | Required | Description                                      |
|---------------------|----------|----------|--------------------------------------------------|
| `fullname.firstname`| `string` | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname` | `string` | No       | The last name of the user (minimum 3 characters if provided). |
| `email`             | `string` | Yes      | A valid email address.                          |
| `password`          | `string` | Yes      | A password with a minimum of 6 characters.      |

#### Example Request Body
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

---

### Response Body
The response body will be in JSON format and include the following fields:

| Field               | Type     | Description                                      |
|---------------------|----------|--------------------------------------------------|
| `token`             | `string` | The generated authentication token.             |
| `user._id`          | `string` | The unique identifier of the user.              |
| `user.fullName.firstname` | `string` | The first name of the user.                   |
| `user.fullName.lastname`  | `string` | The last name of the user.                    |
| `user.email`        | `string` | The email address of the user.                  |
| `user.createdAt`    | `string` | The timestamp when the user was created.        |
| `user.updatedAt`    | `string` | The timestamp when the user was last updated.   |

#### Example Response Body
```json
{
    "token": "generatedAuthToken",
    "user": {
        "_id": "userId",
        "fullName": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2025-04-07T10:00:00.000Z",
        "updatedAt": "2025-04-07T10:00:00.000Z"
    }
}
```

---

### Error Response Body
The error response body will be in JSON format and include the following fields:

#### Example Error Response Body
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password should be atleast 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

---

## Endpoint: `/users/login`

### Method: `POST`

### Description
This endpoint is used to authenticate an existing user. It validates the input data, checks the user's credentials, and returns an authentication token along with the user details if the credentials are valid.

---

### Request Body
The request body must be in JSON format and include the following fields:

| Field      | Type     | Required | Description                                      |
|------------|----------|----------|--------------------------------------------------|
| `email`    | `string` | Yes      | A valid email address.                          |
| `password` | `string` | Yes      | The user's password (minimum 6 characters).     |

#### Example Request Body
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

---

### Error Response Body
The error response body will be in JSON format and include the following fields:

#### Example Error Response Body
```json
{
    "message": "Invalid email or password"
}
```

---

## Endpoint: `/users/profile`

### Method: `GET`

### Description
This endpoint is used to retrieve the profile of the currently authenticated user. The user must be logged in and provide a valid authentication token.

---

### Request Headers
The request must include the following header:

| Header            | Type     | Required | Description                                      |
|-------------------|----------|----------|--------------------------------------------------|
| `Authorization`   | `string` | Yes      | A valid JWT token in the format `Bearer <token>`. |

---

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Description:** User profile retrieved successfully.
- **Example Response:**
```json
{
    "_id": "userId",
    "fullName": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2025-04-07T10:00:00.000Z",
    "updatedAt": "2025-04-07T10:00:00.000Z"
}
```

#### Error Response
- **Status Code:** `401 Unauthorized`
- **Description:** User is not authenticated.
- **Example Response:**
```json
{
    "message": "Unauthorized"
}
```

---

## Endpoint: `/users/logout`

### Method: `GET`

### Description
This endpoint is used to log out the currently authenticated user. It clears the authentication token from the cookies and adds the token to a blacklist to prevent reuse.

---

### Request Headers
The request must include the following header:

| Header            | Type     | Required | Description                                      |
|-------------------|----------|----------|--------------------------------------------------|
| `Authorization`   | `string` | Yes      | A valid JWT token in the format `Bearer <token>`. |

---

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Description:** User logged out successfully.
- **Example Response:**
```json
{
    "message": "Logged out"
}
```

#### Error Response
- **Status Code:** `401 Unauthorized`
- **Description:** User is not authenticated.
- **Example Response:**
```json
{
    "message": "Unauthorized"
}
```

---

## Endpoint: `/captains/register`

### Method: `POST`

### Description
This endpoint is used to register a new captain. It validates the input data, creates a captain in the database, and returns the captain's details along with an authentication token.

---

### Request Body
The request body must be in JSON format and include the following fields:

```json
{
    "fullname": {
        "firstname": "Jane", // Required, minimum 3 characters
        "lastname": "Doe" // Optional, minimum 3 characters if provided
    },
    "email": "jane.doe@example.com", // Required, must be a valid email
    "password": "securePassword123", // Required, minimum 6 characters
    "vehicle": {
        "color": "Red", // Required, minimum 3 characters
        "plate": "ABC123", // Required, minimum 3 characters
        "capacity": 4, // Required, must be an integer >= 1
        "vehicleType": "car" // Required, must be one of ["motorcycle", "car", "auto"]
    }
}
```

---

### Response Body
The response body will be in JSON format and include the following fields:

| Field               | Type     | Description                                      |
|---------------------|----------|--------------------------------------------------|
| `token`             | `string` | The generated authentication token.             |
| `captain._id`       | `string` | The unique identifier of the captain.            |
| `captain.fullname.firstname` | `string` | The first name of the captain.                 |
| `captain.fullname.lastname`  | `string` | The last name of the captain.                  |
| `captain.email`     | `string` | The email address of the captain.                |
| `captain.vehicle.color` | `string` | The color of the vehicle.                      |
| `captain.vehicle.plate` | `string` | The license plate of the vehicle.              |
| `captain.vehicle.capacity` | `number` | The capacity of the vehicle.                  |
| `captain.vehicle.vehicleType` | `string` | The type of the vehicle.                      |
| `captain.createdAt` | `string` | The timestamp when the captain was created.      |
| `captain.updatedAt` | `string` | The timestamp when the captain was last updated. |

#### Example Response Body
```json
{
    "token": "generatedAuthToken", // JWT token for authentication
    "captain": {
        "_id": "captainId", // Unique identifier for the captain
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "createdAt": "2025-04-07T10:00:00.000Z",
        "updatedAt": "2025-04-07T10:00:00.000Z"
    }
}
```

---

### Error Response Body
The error response body will be in JSON format and include the following fields:

#### Example Error Response Body
```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name should be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "Vehicle type should be either motorcycle, car, or auto",
            "param": "vehicle.vehicleType",
            "location": "body"
        }
    ]
}
```

---

## Endpoint: `/captains/login`

### Method: `POST`

### Description
This endpoint is used to authenticate an existing captain. It validates the input data, checks the captain's credentials, and returns an authentication token along with the captain's details if the credentials are valid.

---

### Request Body
The request body must be in JSON format and include the following fields:

| Field      | Type     | Required | Description                                      |
|------------|----------|----------|--------------------------------------------------|
| `email`    | `string` | Yes      | A valid email address.                          |
| `password` | `string` | Yes      | The captain's password (minimum 6 characters).  |

#### Example Request Body
```json
{
    "email": "jane.doe@example.com",
    "password": "securePassword123"
}
```

---

### Error Response Body
The error response body will be in JSON format and include the following fields:

#### Example Error Response Body
```json
{
    "message": "Invalid email or password"
}
```

---

## Endpoint: `/captains/profile`

### Method: `GET`

### Description
This endpoint is used to retrieve the profile of the currently authenticated captain. The captain must be logged in and provide a valid authentication token.

---

### Request Headers
The request must include the following header:

| Header            | Type     | Required | Description                                      |
|-------------------|----------|----------|--------------------------------------------------|
| `Authorization`   | `string` | Yes      | A valid JWT token in the format `Bearer <token>`. |

---

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Description:** Captain profile retrieved successfully.
- **Example Response:**
```json
{
    "_id": "captainId",
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    },
    "createdAt": "2025-04-07T10:00:00.000Z",
    "updatedAt": "2025-04-07T10:00:00.000Z"
}
```

#### Error Response
- **Status Code:** `401 Unauthorized`
- **Description:** Captain is not authenticated.
- **Example Response:**
```json
{
    "message": "Unauthorized"
}
```

---

## Endpoint: `/captains/logout`

### Method: `GET`

### Description
This endpoint is used to log out the currently authenticated captain. It clears the authentication token from the cookies and adds the token to a blacklist to prevent reuse.

---

### Request Headers
The request must include the following header:

| Header            | Type     | Required | Description                                      |
|-------------------|----------|----------|--------------------------------------------------|
| `Authorization`   | `string` | Yes      | A valid JWT token in the format `Bearer <token>`. |

---

### Response

#### Success Response
- **Status Code:** `200 OK`
- **Description:** Captain logged out successfully.
- **Example Response:**
```json
{
    "message": "Logged out"successfully"
}
```

#### Error Response
- **Status Code:** `401 Unauthorized`
- **Description:** Captain is not authenticated.
- **Example Response:**
```json
{
    "message": "Unauthorized"
}
```

---