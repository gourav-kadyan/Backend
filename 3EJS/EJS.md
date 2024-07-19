

# EJS (Embedded JavaScript Templates) Notes

## Why Use EJS?

- **Dynamic Content**: EJS allows embedding JavaScript variables into HTML templates. This is helpful when you need to dynamically update parts of an HTML file (e.g., user names) without manually editing the HTML.
  ```html
  <p>Hi, <%= name %></p>
  ```
  Here, `<%= name %>` is a placeholder that will be replaced with the value of the `name` variable.

- **Handling Undefined Variables**: If a variable is not defined, EJS renders it as empty or `NaN` instead of throwing an error. To manage this, you can use `res.locals` to provide default values:
  ```javascript
  app.use((req, res, next) => {
      res.locals.name = 'Default Name'; // Default value for `name`
      next();
  });
  ```

## Views Directory

- **Views Directory**: EJS templates are stored in a `views` directory. Express.js automatically looks here for your template files, so you only need to specify the file name when rendering views:
  ```javascript
  app.set('views', path.join(__dirname, 'views')); // Set views directory
  ```

## Handling Static Files

### Setting Up Static File Serving

- **Serving Static Files**: Use `express.static()` to serve static files such as CSS, JavaScript, and images. This involves creating a directory for static files and using `path.join()` to specify the path.
  ```javascript
  import express from 'express';
  import path from 'path';
  
  const app = express();
  
  app.use(express.static(path.join(__dirname, 'public')));
  ```
  Place your static files (e.g., CSS, JavaScript) in the `public` directory. Be cautious: anyone who knows the file names can access them through the browser.

## Creating a Contact Form

### Steps to Create a Contact Form and API

1. **HTML Form**:
   ```html
   <form action="/contact" method="POST">
       <label for="name">Name:</label>
       <input type="text" id="name" name="name">
       <label for="message">Message:</label>
       <textarea id="message" name="message"></textarea>
       <button type="submit">Send</button>
   </form>
   ```

2. **Middleware Setup**:
   - Use `body-parser` to parse form data:
     ```javascript
     import express from 'express';
     import bodyParser from 'body-parser';

     const app = express();
     
     app.use(bodyParser.urlencoded({ extended: true }));
     ```

3. **Define Routes**:
   - Handle form submission and redirect:
     ```javascript
     const contacts = []; // Temporary database

     app.post('/contact', (req, res) => {
         const { name, message } = req.body;
         contacts.push({ name, message });
         res.redirect('/success');
     });

     app.get('/success', (req, res) => {
         res.send('Form submitted successfully!');
     });
     ```

4. **View Submitted Data**:
   - Create an endpoint to view submitted data:
     ```javascript
     app.get('/users', (req, res) => {
         res.json(contacts);
     });
     ```

