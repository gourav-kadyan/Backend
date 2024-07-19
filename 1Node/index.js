console.log("hello")
console.log(400/2)

//getting personal made module

// const name = require("./cmod")
//after multimodule exports

// const obj = require("./cmod")
//const {name, obj} = require("./cmod") // same as above

// import * as obj from "./cmod.js"

import { genaratePercent } from "./cmod.js";

console.log(genaratePercent());