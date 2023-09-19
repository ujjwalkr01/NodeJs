const http = require("http");
const url = require("url");
const fs = require("fs");

//reading the data from dev-data...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//.createServer helps to create the server...
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const pathName = req.url;

  if (pathName == "/" || pathName == "/overview") {
    res.end("hi this is overview page"); //sending back the response
  } else if (pathName == "/product") {
    res.end("Hello this is the product page!");
  } else if (pathName == "/api") {
    /*we can also use directally the {dirname}-->to specify the directory */
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   //   console.log(productData);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    // });
    // res.end("api");
    res.writeHead(200, { "Content-type": "application/json" }); //this is for passing the data in the json format
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html", //this is for passing the data in the html format..
      "my-own-header": "hello ujjwal",
    });
    res.end(
      "<h1>Page not found!<h1>"
    ); /*in this case while passing headers we have to pass res.end after the header */
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening from the server!");
});
