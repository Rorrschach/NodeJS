// console.log(arguments);
// console.log(require("module").wrapper);

const x = require("./test-module1");
const calc1 = new x();
console.log(calc1.add(2, 5));


//const y = require("./test-module2");
const { add, subtract, multiply, divide } = require("./test-module2");
console.log(add(2, 5));

require("./test-module3")();

require("./test-module3")();

