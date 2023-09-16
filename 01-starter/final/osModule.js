/* 1---> Osmodules*/
//we import module using require in node js
/*The node:os module provides operating system-related utility methods and properties. It can be accessed using:* */
const osModule = require("os");
const {
  uptime,
  cpus,
} = require("os"); /*all these method are in from of properties in osmodule object thats is why we can destructure and use them directally as we did in line 17*/
console.log("platform-->", osModule.platform());
console.log("platformType-->", osModule.type());
console.log("Architecture-->", osModule.arch());
console.log("Memory-->", osModule.totalmem() / 1024 / 1024 / 1024);
console.log("FreeMemory-->", osModule.freemem() / 1024 / 1024 / 1024);
console.log("user Info-->", osModule.userInfo());
console.log("UpTime-->", uptime() / 3600);
console.log("CPUs-->", cpus());
