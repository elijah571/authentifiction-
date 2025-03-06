
 User Authentication & Management System

This is a User Authentication and Management system built using **Express.js** and **MongoDB** with **JWT** for token-based authentication. The project supports user registration, login, password reset, account verification, role management (admin, shipper, carrier, user), and profile updates. The system has several protected routes based on user roles, including admin access for managing other users.

## Features

- **User Registration**: Users can register with their name, email, and password.
- **Account Verification**: After registration, users receive a verification token via email to activate their account.
- **Login and Logout**: Users can log in with their credentials and logout via a secure token-based session.
- **Password Reset**: Users can reset their password by receiving a reset token via email.
- **Admin Role**: Admin users can manage (update, delete) any user profiles and assign roles.
- **Role-based Access Control**: Protect routes based on user roles (Admin, Shipper, Carrier, User).
- **Middleware Authentication**: Ensures only authenticated and authorized users can access certain routes.

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Password Encryption**: bcryptjs
- **Input Validation**: validator
- **Email Handling**: Send verification and reset password emails using custom email functions.
- **Environment Variables**: dotenv for managing secrets (e.g., JWT secret, email settings).

## Setup Instructions

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (You can use MongoDB Atlas for cloud or install MongoDB locally)
- **Postman** or any API testing tool to test the endpoints

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:
   ```env
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### API Endpoints

#### 1. **User Registration**

- **POST** `/api/user/signup`
  - Registers a new user with email, name, and password.

#### 2. **Account Verification**

- **POST** `/api/user/verify-account`
  - Verifies the account using a verification token received via email.

#### 3. **Login**

- **POST** `/api/user/login`
  - Logs the user in using their email and password. Returns a JWT token.

#### 4. **Logout**

- **POST** `/api/user/logout`
  - Logs the user out by clearing the token stored in the cookies.

#### 5. **Password Reset**

- **POST** `/api/user/resetToken`
  - Sends a password reset token to the user’s email.

- **PUT** `/api/user/reset-password/:userId`
  - Resets the user’s password using the reset token.

#### 6. **Update User Profile**

- **PUT** `/api/user/update-user-role/:userId`
  - Admin-only endpoint to update a user’s profile and role.

#### 7. **Get All Users**

- **GET** `/api/user`
  - Admin-only endpoint to get all users.

#### 8. **Get User by ID**

- **GET** `/api/user/:userId`
  - Fetches a user’s profile by their ID.

#### 9. **Delete User**

- **DELETE** `/api/user/delete/:userId`
  - Admin-only endpoint to delete a user by their ID.

### Authentication Middleware

The following middlewares are used to ensure route protection:

- **isAuthenticateUser**: Ensures the user is authenticated by checking the presence and validity of the JWT token.
- **isAdmin**: Ensures the user has admin privileges.
- **isShipper**: Ensures the user has shipper privileges or is an admin.
- **isCarrier**: Ensures the user has carrier privileges or is an admin.

### Password Strength Validation

Passwords must meet the following criteria:

- Minimum length of 6 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one numeric digit
- At least one special character (e.g., !@#$%^&*)

### Email Template for Verification and Reset

- **Verification Email**: Sends a 6-digit verification token to the user’s email.
- **Password Reset Email**: Sends a 6-digit reset token to the user’s email.

### Error Handling

Errors are handled globally, with appropriate status codes and messages returned for different failure scenarios (e.g., invalid token, missing fields, expired token).

### Example API Testing

1. **Register a New User**
   - Send a POST request to `/api/user/signup` with the following body:
     ```json
     {
       "email": "test@example.com",
       "name": "Test User",
       "password": "Test@1234"
     }
     ```

2. **Login**
   - Send a POST request to `/api/user/login` with:
     ```json
     {
       "email": "test@example.com",
       "password": "Test@1234"
     }
     ```

3. **Get All Users (Admin only)**
   - Send a GET request to `/api/user` with a valid token in the cookies.

## Contributing

Feel free to fork this project and submit issues or pull requests. If you want to contribute, please create an issue to discuss changes before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

