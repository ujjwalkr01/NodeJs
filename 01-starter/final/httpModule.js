const http = require("http");
const url = require("url");
const fs = require("fs");

/*we can also create our own module and use it as mentioned below */
const replaceTemplate = require("./modules/replaceTemplate.js");

//for reading templates...
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

//reading the data from dev-data...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//.createServer helps to create the server...
const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  
  const { query, pathname: pathName } = url.parse(req.url, true);

  // const pathName = req.url;

  //overview Page....
  if (pathName == "/" || pathName == "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    // console.log(cardsHtml);
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output); //sending back the response

    //product Page....
  } else if (pathName == "/product") {
    // console.log(query.id);
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    // res.end("Hello this is the product page!");
    res.end(output);

    //Api page...
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
