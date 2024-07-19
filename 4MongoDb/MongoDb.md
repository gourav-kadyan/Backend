
# MongoDB Notes

## What is MongoDB?

- **MongoDB** is a NoSQL, document-oriented database designed for high performance, high availability, and easy scalability.
- It stores data in flexible, JSON-like documents, allowing for varied fields and dynamic schemas.

### Key Concepts

- **Database**: A container for collections. Similar to a schema in relational databases.
- **Collection**: A grouping of MongoDB documents, similar to a table in relational databases. Collections exist within a single database.
- **Document**: The basic unit of data in MongoDB, stored in BSON (Binary JSON) format. Equivalent to a row in a table.
- **Field**: A key-value pair in a document, similar to a column in a table.

### Features

- **Schema-less**: Collections do not enforce document structure, allowing for flexible and dynamic schemas.
- **Indexing**: Supports various types of indexing (e.g., single field, compound, multi-key) to improve query performance.
- **Replication**: Provides high availability with replica sets (multiple copies of data across different nodes).
- **Sharding**: Enables horizontal scaling by distributing data across multiple servers using a shard key.
- **Aggregation**: Offers a powerful framework for data processing and transformation.

### Use Cases

- Applications with diverse and evolving data structures.
- Handling large volumes of unstructured or semi-structured data.
- Real-time analytics, content management, and IoT applications.

MongoDB is appreciated for its flexibility, scalability, and performance, making it ideal for modern web applications and big data solutions.

## Mongoose Model Setup

### 1. Create a Mongoose Model

Set up a Mongoose model for a `User`:

```javascript
// models/User.js
const mongoose = require('mongoose');

// Define the schema for a User
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
```

## CRUD Operations with Mongoose

### 2. Create Operation

Create a new user document:

```javascript
app.post("/users", async (req, res) => {
    try {
        // Create a new User instance with request body data
        const newUser = new User(req.body);
        // Save the new User document to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // Respond with the created user
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user"); // Handle errors
    }
});
```

### 3. Read Operations

#### Read All Users

Retrieve all user documents:

```javascript
app.get("/users", async (req, res) => {
    try {
        // Find all User documents
        const users = await User.find({});
        res.json(users); // Respond with the list of users
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving users"); // Handle errors
    }
});
```

#### Read a User by ID

Retrieve a single user document by ID:

```javascript
app.get("/users/:id", async (req, res) => {
    try {
        // Find a User document by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found"); // Handle user not found
        }
        res.json(user); // Respond with the user document
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user"); // Handle errors
    }
});
```

### 4. Update Operation

Update a user document by ID:

```javascript
app.put("/users/:id", async (req, res) => {
    try {
        // Update a User document by ID with new data
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).send("User not found"); // Handle user not found
        }
        res.json(updatedUser); // Respond with the updated user document
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user"); // Handle errors
    }
});
```

### 5. Delete Operation

Delete a user document by ID:

```javascript
app.delete("/users/:id", async (req, res) => {
    try {
        // Delete a User document by ID
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send("User not found"); // Handle user not found
        }
        res.json(deletedUser); // Respond with the deleted user document
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user"); // Handle errors
    }
});
```

### Summary

- **Create**: `app.post("/users", ...)` - Adds a new user.
- **Read**: 
  - `app.get("/users", ...)` - Retrieves all users.
  - `app.get("/users/:id", ...)` - Retrieves a user by ID.
- **Update**: `app.put("/users/:id", ...)` - Updates a user by ID.
- **Delete**: `app.delete("/users/:id", ...)` - Deletes a user by ID.

--- 

This document provides an overview of MongoDB, Mongoose, and how to perform CRUD operations with Mongoose in an Express.js application.