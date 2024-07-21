# Authentication and API Initialization Notes

## Introduction
These notes cover handling API initialization, including login, logout, cookies, sessions, local storage, and data storage using MongoDB. They explain the use of JWT tokens for secure authentication, bcrypt for password hashing, and cookie-parser for managing cookies.

## Topics Covered

### 1. API Initialization (Login and Logout)
- **Login and Logout Flow**:
  - Implement login and logout functionality using API endpoints.
  - Ensure secure transmission and handling of user credentials.

### 2. Cookies, Sessions, and Local Storage
- **Cookies**:
  - Create cookies for user authentication.
  - Use cookies to store session information securely.
  - Example:
    ```javascript
    import { createCookie } from 'cookie-utils';

    createCookie('userId', userId, { httpOnly: true, secure: true });
    ```
- **Sessions**:
  - Manage user sessions to maintain login state across multiple requests.
- **Local Storage**:
  - Store non-sensitive user information locally on the client side.

### 3. JWT Tokens for Authentication
- **Why JWT Tokens?**:
  - Avoid exposing user IDs in cookies.
  - Provide a secure way to handle authentication.
- **Implementation**:
  - Generate JWT tokens upon successful login.
  - Use JWT tokens for authentication in subsequent requests.
  - Example:
    ```javascript
    import jwt from 'jsonwebtoken';

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    createCookie('authToken', token, { httpOnly: true, secure: true });
    ```

### 4. Handling Authentication
- **Login, Logout, and Register Pages**:
  - Default to the login page.
  - Provide a link to the registration page for new users.
  - Redirect to the logout page upon successful login.
- **Middleware Handling**:
  - Use `next()` to pass control to the next middleware function.
  - Example:
    ```javascript
    import jwt from 'jsonwebtoken';

    function authenticate(req, res, next) {
      const token = req.cookies.authToken;
      if (token) {
        jwt.verify(token, 'secretKey', (err, decoded) => {
          if (err) {
            return res.status(401).send('Unauthorized');
          }
          req.userId = decoded.userId;
          next();
        });
      } else {
        res.status(401).send('Unauthorized');
      }
    }
    ```

### 5. Data Storage with MongoDB
- **Storing User Data**:
  - Store user information, including hashed passwords, in MongoDB.
  - Example:
    ```javascript
    import mongoose from 'mongoose';
    import { hashPassword } from 'auth-utils';

    const User = mongoose.model('User', new mongoose.Schema({
      username: String,
      email: String,
      password: String,
    }));

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    });
    await user.save();
    ```

### 6. Using `bcrypt` for Password Hashing
- **Hashing Passwords**:
  - Hash passwords before storing them in the database.
  - Verify hashed passwords during login.
  - Example:
    ```javascript
    import bcrypt from 'bcrypt';

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    ```

### 7. Using `cookie-parser`
- **Managing Cookies**:
  - Use `cookie-parser` to parse cookies and access them in the application.
  - Display user-specific information using cookies.
  - Example:
    ```javascript
    import cookieParser from 'cookie-parser';

    app.use(cookieParser());

    app.get('/logout', (req, res) => {
      const username = req.cookies.username;
      res.send(`Goodbye, ${username}`);
    });
    ```

### 8. Conditional Checks in Authentication
- **Password and Email Checks**:
  - Verify that the entered password matches the stored hashed password.
  - Check for duplicate emails during registration.
  - Example:
    ```javascript
    import bcrypt from 'bcrypt';

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // Proceed with login
    } else {
      // Handle login failure
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      // Handle duplicate email
    } else {
      // Proceed with registration
    }
    ```

## Conclusion
These notes provide a comprehensive guide to handling API initialization, authentication, and secure data management using cookies, sessions, JWT tokens, MongoDB, and bcrypt. The use of `cookie-parser` and middleware functions ensures a smooth and secure user experience.
