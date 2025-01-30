**_REQUEST HANDLERS_**

- A request handler is a function that defines how to respond to a specific HTTP request for a given route (URL path). It takes in a request object and a response object to handle and send responses to the client.

```javascript
// Define a route/request handler for a GET request to the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
```

- Middleware Functions: Request handlers are essentially middleware functions that have access to the req (request), res (response), and next (next middleware) objects. They can perform tasks like modifying request or response objects, ending the request-response cycle, and calling the next middleware.

- Route Handlers: A request handler can be specific to a route or endpoint. For example, app.get('/route', handler) is a route-specific handler that only responds to GET requests to /route.

- Chaining Handlers: Multiple request handlers can be chained together for a single route by passing them as arguments. For example:

```javascript
app.get("/route", handler1, handler2);
```

- Using next(): The next() function is used to pass control to the next middleware in line. If next() is not called, the request will hang and not move forward.

# What is Middleware :

- Middleware in software development, particularly within web frameworks like Express.js, refers to functions that execute during the request-response cycle of an application. These functions can modify the request or response objects, handle errors, log activities, or perform other tasks before passing control to the next middleware function.

- generally, Middleware is a theoritical concept, because these are just functions which comes between the request, response cycle.

- so, there is no certain rule of how to define it.
- we can use the app.use or we can also use app.get, app.post etc.
- we generally, use the app.use beacuse the app.use will execute irrespective of the method call.
- suppose we have admin panel, and wee need to first authorize the icnoming request before any other api calls like getData or deleteData etc.
- for this, we can either apply authorization inside the api call, but by this method we need to write the authorization code again and again for all the api's like getData, getAllData, saveData, deleteData etc.
- the better way to do this is, define the authorziation code into the Middleware.
- we write out auth code inside the app.use("/admin), so any req which comes for admin will first get through this middleware.
- we can also define it using the app.get or app.post, if we only need authorzation on get request or post req etc.

# MONGO DB CONNECTION PROCEDURE:

1. first we need to install Mongoose, by npm i mongoose.

- what is mongoose why sould i use it ?

  Mongoose is a widely-used Object Data Modeling (ODM) library for MongoDB and Node.js.Think of it as a helpful bridge between MongoDB (your database) and your Node.jsapplication, making it easier to interact with your database in a structured and organized way.

**Here are a few reasons why you might want to use Mongoose:**

- Schema Definition: Mongoose allows you to define the structure of your documents (like a blueprint) using schemas. This ensures that your data follows a consistent format.

- Data Validation: It includes built-in validation, ensuring that your data meets specified criteria before it's saved to the database.

- Middleware: Mongoose provides middleware (pre and post hooks) that lets you run custom logic before or after certain operations, like saving or updating a document.

2. We import the Mongoose inside our db connection file. `const mongoose = require("mongoose");`.

3. We need to write mongoose.connect("connection string"), but this will return an promise.

4. So, we will wrap it inside the Async function. and call it.

```Javascript
  const mongoose = require("mongoose");

  const connectDB = async() =>{
    await mongoose.connect("connection string");
  }
```

5. As it is returning us a promise. so we can call this function like this:

```Javascript
connectDB().then(()=>{
  console.log("connection established");
}).catch(err => {
  console.error("Database cannot connected");
})
```

6. After all of this. we just need to import this db connection file into our app.js

# Schema In MongoDB:

- schema is a blueprint for your documents in a collection. It defines the structure of the documents, including fields, their types, and any validation rules. Even though MongoDB is a schemaless database, defining a schema can bring numerous benefits, such as ensuring data consistency and preventing errors.

```Javascript
// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
```

# Creating a Model

- After defining a schema, you create a model using that schema. A model is a class that allows you to interact with your MongoDB collection. It provides an interface to perform CRUD (Create, Read, Update, Delete) operations and query the database.

```Javascript
// Create the model
const User = mongoose.model('User');
```

compare them with sql elements and tell me
Sure, let's compare these concepts with their counterparts in SQL databases:

1. Collection vs. Table
   Collection (NoSQL): A collection in a NoSQL database like MongoDB is a container for documents, where each document can have a different structure.

Table (SQL): A table in a relational database like MySQL, PostgreSQL, or SQL Server is a structured format with rows and columns, where each row represents a record and each column represents a field.

2. Schema vs. Table Definition
   Schema (NoSQL): In NoSQL databases, schemas are often flexible, allowing for documents within a collection to have different structures. However, some NoSQL databases still use schemas to define the structure.

Table Definition (SQL): In SQL databases, the schema defines the structure of a table, including column names, data types, and constraints like primary keys, foreign keys, and unique constraints.

3. Model vs. Object-Relational Mapping (ORM)
   Model (NoSQL): In the context of ORMs like Mongoose for MongoDB, a model represents a blueprint for a document, including its structure and methods.

ORM (SQL): In SQL databases, ORMs like Sequelize or Entity Framework create models that map to tables. These models define the structure and behavior of the data, allowing developers to interact with the database using object-oriented code.

# Validation and Encryption:

- for validation of our Email and Knowing that our password is strong or not. we will use a middleware function.
- which is validator, by installing npm i validator
- we use it by require inside our file, then check by const user = validator.isEmail(Email_variable);

- and for encryption we have to use Bcrypt, by npm i bcrypt.
- we have to provide the plaintext password , and in second parmeter we have to provide the dalt number.
  .i.e how many rounds of encryption we need to perform, the more the rounds stronger out password.
- e.g. code :

```Javascript
const hashPassword = await bcrypt.hash(password, 10);
```

**_CONCEPT OF JWT AND COOKIES_**

# what jwt token is, and how it works and its relation to cookies

JWT (JSON Web Token) is an open standard used to share security information between two parties—usually a client and a server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are a type of token that is often used in modern web applications for user authentication and information exchange.

# Use Cases for JWT

- Authentication: Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources permitted with that token.

- Information Exchange: JWTs are a good way of securely transmitting information between parties because they can be signed, meaning you can be sure the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn’t been tampered with.

# Relation to Cookies

Security Considerations:

- XSS (Cross-Site Scripting): Storing JWTs in local storage makes them susceptible to XSS attacks, where malicious scripts can steal the token. Cookies can mitigate this risk by using the HttpOnly flag, which makes cookies inaccessible to JavaScript.

- That's Why the JWT token are inserted inside the Cookie.

# Session Management:

- In traditional session management, the server keeps track of active sessions, typically stored in a database, and identifies users using session IDs stored in cookies.

- With JWT, the session data (claims) is stored on the client side, which can reduce the server's memory load but requires careful management, such as token expiration and refresh mechanisms.

# Summary

- JWTs are compact, URL-safe tokens that can be used for securely transmitting information between parties.

- JWTs can be stored in either local storage or cookies, each with its own security considerations.

# COOKIES :

- Cookies have been around much longer than JWTs and served as a fundamental part of web development for maintaining state and session information in web applications. Here’s why cookies were and are still used:

# The Role of Cookies Before JWT

Session Management: Web servers are stateless by nature, meaning each request is treated independently. To maintain user sessions (e.g., keeping a user logged in as they navigate between pages), cookies were used to store session IDs. The server would then associate this ID with session data stored on the server side.

# Personalization:

- Cookies were used to store user preferences and personalize the user experience. For example, remembering a user's language preference or items in a shopping cart.

# How Cookies Work

- Setting Cookies: When a user visits a website, the server can send an HTTP response with a Set-Cookie header. The browser stores this cookie and sends it back to the server with every subsequent request to the same domain.

- Retrieving Cookies: On the server side, applications can read the cookies sent with each request to identify users and manage sessions accordingly.

# Evolution to JWT

- While cookies are still widely used and useful, JWTs offered a modern approach to some of the limitations of traditional session management:

  - Client-Side Storage: JWTs allow storing more detailed session data on the client side, reducing the load on the server.

  - Statelessness: With JWTs, the server doesn’t need to store session data, making it easier to scale applications horizontally.

  - Flexibility: JWTs are more versatile in various contexts, such as mobile applications, single-page applications (SPAs), and APIs.
