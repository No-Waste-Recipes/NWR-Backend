"use strict";
var express = require("express");
var app = express();
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.get("/url", function (req, res, next) {
    var test = "test";
    res.json(["Tony"]);
});
