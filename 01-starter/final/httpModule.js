const http = require("http");
const url = require("url");
const fs = require("fs");

//function ...
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

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
  //   console.log(req.url);
  const pathName = req.url;

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
    res.end("Hello this is the product page!");

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
