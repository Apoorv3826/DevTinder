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
