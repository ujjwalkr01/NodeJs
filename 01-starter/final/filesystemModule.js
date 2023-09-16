/* 2---> FileSystemmodules*/

const {
  mkdir,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readFile,
  writeFile,
} = require("fs");

// mkdirSync("./txt/output.txt"); //for creating the new file

/**This is Blocking synchronus way */
const textIn = readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
writeFileSync("./txt/output.txt", textOut);
console.log(readFileSync("./txt/output.txt", "utf-8"));

/**This is non-blocking ,asynchronus way */
readFile("./txt/startt.txt", "utf-8", (err, data1) => {
  if (err) {
    return console.error("Error!");
  }
  console.log(data1);
  readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      writeFile(
        "./txt/final.txt",
        `This is combination of data 2 and 3:-\n${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log(
            "your new file has been created and the content had been added"
          );
        }
      );
    });
  });
});
