const express = require("express");
const morgan = require("morgan"); /**it is 3rd party middleware used to read the request/response */

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/*--------------Middleware--------------* */
app.use(morgan("dev"));

/*this is the middleware that is present between the request and response and converts the json code directally to object */
app.use(express.json());

const genricFun = (req, res, next) => {
  console.log("hello i am generic function middleware");
  next();
};

const loggingIn = (req, res, next) => {
  console.log("hello i am logging middleware!");
  next();
};
/**we can create our own middleware and then use it but we should always use third parameter as next() which passes the execution to the next code else the other line of code will be in pending state.. */
app.use(genricFun);
app.use(loggingIn);

/**------Server----------------------- */

/*Note----> if we use middleware after the http method then it will not get executed as the req-res cycle will be ended so it's most preferable to use middleware at top-level of the http request*/
app.use(genricFun);

/*-------------Routing-----------------*/
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
