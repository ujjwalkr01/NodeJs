const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

//we can also use ES6 class
// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const myEmitter = new Sales();

//here using on we are listener for a event....
myEmitter.on("sale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Ujjwal");
});

myEmitter.on("newSale", (data) => {
  console.log(`There are now ${data} items left in stock`);
});

//here we are emiting
/**when we are using our custom events in our application then we have to emit the events ourself */
myEmitter.emit("newSale", 9);
myEmitter.emit("sale");

/**--------------------------------------------------------- */

/**In case of built in node module function will emit their own events as many time we dont have to emit the events  */

const server = http.createServer();

//on basically means that we aere listening for an event...
server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received!");
});
server.on("request", () => {
  console.log(" Another Request received!");
});
server.on("close", () => {
  console.log("Server Request closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for the request....");
});
