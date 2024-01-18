const fs = require("fs");
const http = require("http");
const url = require("url");

//this is syn task that means until reading of file isn't completed next line will be blocked
// const textOut = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textOut);

// const text =
//   "Hi, my name is Ujjwal. I have created this dummyOutput and practiseFileSystem file for the practise.";

// fs.writeFileSync("./txt/dummyOutput.txt", text);

// //asynchronus way

// fs.readFile("./txt/dummyOutput.txt", "utf-8", (err, data) => {
//   console.log(data);
//   fs.writeFile(
//     "./txt/dummyOutput.txt",
//     "hi I have been written in the async way",
//     "utf-8",
//     (err) => {
//       fs.readFile("./txt/dummyOutput.txt", "utf-8", (err, updatedData) => {
//         console.log(updatedData);
//       });
//     }
//   );
// });

// console.log(
//   "i am not blocked because above reading and writing file has been done asynchronusly"
// );

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  console.log(url.parse(req.url, true));

  const pathname = req.url;

  if (pathname == "/" || pathname == "/overview") {
    res.end("This is a overview page");
  } else if (pathname == "/product") {
    res.end("This is a product page");
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h2>Page not found!</h2>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening the request from the server!");
});
