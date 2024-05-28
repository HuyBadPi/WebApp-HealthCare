import express from "express";

let configViewEngine = (app) => {
    //arrow function
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/view");
};

module.exports = configViewEngine; // các file khác có thể dùng function này
