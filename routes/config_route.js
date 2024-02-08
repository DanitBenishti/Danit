
const loginR = require("./login");
const booksR = require("./books");
const indexR = require("./index");
const registerR = require("./register");

exports.routesInit = (app) => {    
    app.use("/", loginR)
    app.use("/", booksR)
    app.use("/", indexR)
    app.use("/", registerR)
}