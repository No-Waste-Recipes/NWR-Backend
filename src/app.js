"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const route_1 = __importDefault(require("./recipes/route"));
const route_2 = __importDefault(require("./ingredients/route"));
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.get("/url", function (req, res, next) {
    const test = "test";
    res.json([test]);
});
/* Routes */
app.use('/recipes', route_1.default);
app.use('/ingredients', route_2.default);
//# sourceMappingURL=app.js.map