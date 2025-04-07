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
            "msg": "First name should be atleast 3 characters long",
            "param": "fullname.firstname",
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