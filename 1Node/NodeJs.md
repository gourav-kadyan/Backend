
# Node.js Notes

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to execute JavaScript code on the server side. Node.js uses an event-driven, non-blocking I/O model, making it lightweight and efficient for building scalable network applications.

## Creating a Server in Node.js

### Required Modules

- **http**
  - `http.createServer`:
    - This method is used to create an HTTP server.
    - It requires a request handler function, which takes two parameters: `req` (request) and `res` (response).
    - The `req` parameter is used to handle the incoming request (e.g., routing).
    - The `res` parameter is used to send the appropriate response based on the request.

### Example Code

```javascript
import http from "http"; // Importing the http module

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Request handler
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

## Creating and Using Modules

### What are Modules?

Modules in Node.js are reusable blocks of code whose existence does not impact other code. They can be built-in Node.js modules, third-party modules downloaded via npm, or custom modules created by you.

### Creating a Custom Module

1. Create a file named `cmod.js`.
2. Define the module's functionality.
3. Export the module using `module.exports`.

**Example (`cmod.js`)**:
```javascript
const name = "Gourav";
export default name;
```

### Using a Custom Module

1. Change the `type` in `package.json` to `module` to use ES6 `import` syntax.
2. Import and use the module in another file.

**Example**:
```javascript
import name from './cmod.js';
console.log(name); // Outputs: Gourav
```

## Working with the `fs` Module

The `fs` module provides an API for interacting with the file system.

### Methods

- **`fs.readFile`**:
  - Asynchronously reads the content of a file.
  - Example:
    ```javascript
    import fs from 'fs';
    
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    ```

- **`fs.writeFile`**:
  - Asynchronously writes data to a file.
  - Example:
    ```javascript
    import fs from 'fs';
    
    fs.writeFile('example.txt', 'Hello, World!', (err) => {
        if (err) throw err;
        console.log('File has been saved!');
    });
    ```

- **`fs.readFileSync`**:
  - Synchronously reads the content of a file.
  - Example:
    ```javascript
    import fs from 'fs';
    
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log(data);
    ```

## Working with the `path` Module

The `path` module provides utilities for working with file and directory paths.

### Methods

- **`path.parse`**:
  - Parses a path into an object.
  - Example:
    ```javascript
    import path from 'path';
    
    const parsedPath = path.parse('/home/user/dir/file.txt');
    console.log(parsedPath);
    // Outputs:
    // {
    //   root: '/',
    //   dir: '/home/user/dir',
    //   base: 'file.txt',
    //   ext: '.txt',
    //   name: 'file'
    // }
    ```
---
This Markdown document covers basic concepts and examples related to Node.js, including creating a server, working with modules, and using core Node.js modules like `http`, `fs`, and `path`.
