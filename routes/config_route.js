
const booksR = require("./books");
const indexR = require("./index");
const loanR = require("./loan");

exports.routesInit = (app) => { 
    app.use("/", booksR)
    app.use("/", indexR)
    app.use("/", loanR)
}