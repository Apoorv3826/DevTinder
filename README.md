**_REQUEST HANDLERS_**

- A request handler is a function that defines how to respond to a specific HTTP request for a given route (URL path). It takes in a request object and a response object to handle and send responses to the client.

```javascript
// Define a route/request handler for a GET request to the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
```
