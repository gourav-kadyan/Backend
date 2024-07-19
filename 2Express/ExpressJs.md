
# Express.js Notes

## What is Express.js?

- **Express.js** is a web application framework for Node.js.
- It provides a robust set of features to develop web and mobile applications.
- It is known for its simplicity, flexibility, and scalability, making it easy to write concise and readable code.
- Creating a server is very easy with Express.js.

## Scripts in `package.json`

### Setting Up Scripts

- **Development Script**:
  - Use `nodemon` for automatically restarting the server during development.
  - Example:
    ```json
    "scripts": {
      "dev": "nodemon filename.js"
    }
    ```
  - Run with: `npm run dev`

- **Production Script**:
  - Use `node` for running the server in production.
  - Example:
    ```json
    "scripts": {
      "start": "node filename.js"
    }
    ```
  - Run with: `npm start` (or `npm run start`)

## HTTP Methods

- **`app.get`**: Used to retrieve data.
  ```javascript
  app.get('/route', (req, res) => {
    res.send('GET request to the homepage');
  });
  ```

- **`app.post`**: Used to create data.
  ```javascript
  app.post('/route', (req, res) => {
    res.send('POST request to the homepage');
  });
  ```

- **`app.put`**: Used to update data.
  ```javascript
  app.put('/route', (req, res) => {
    res.send('PUT request to the homepage');
  });
  ```

- **`app.delete`**: Used to delete data.
  ```javascript
  app.delete('/route', (req, res) => {
    res.send('DELETE request to the homepage');
  });
  ```

## Using the `path` Module

- **`path.resolve()`**: Returns the absolute path of a location.
  ```javascript
  import path from 'path';
  
  const absolutePath = path.resolve('somePath');
  console.log(absolutePath);
  ```

- **`path.join()`**: Joins specific paths or strings.
  ```javascript
  import path from 'path';
  
  const joinedPath = path.join('path1', 'path2');
  console.log(joinedPath);
  ```

---

This Markdown document covers the essential concepts and examples related to Express.js, including setting up scripts in `package.json`, handling HTTP methods, and using the `path` module.