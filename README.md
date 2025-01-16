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
