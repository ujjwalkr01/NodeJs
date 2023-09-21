//module.exports....
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports....
const calc2 = require("./test-module-2");
console.log(calc2.mult(2, 5));

//or we can also destructure it and use it directally...

const { add, mult, div } = require("./test-module-2");
console.log(div(4, 2));

//caching....
require("./test-module-3")();
/**in this only one time the module was loaded technically and other two logging came from cache  */
require("./test-module-3")();
require("./test-module-3")();
