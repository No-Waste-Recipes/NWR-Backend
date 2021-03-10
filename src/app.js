"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const route_1 = __importDefault(require("./recipes/route"));
const route_2 = __importDefault(require("./ingredients/route"));
const route_3 = __importDefault(require("./user/route"));
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
// Enable pre-flight
app.options("*", cors());
/* Routes */
app.use('/recipes', route_1.default);
app.use('/ingredients', route_2.default);
app.use('/users', route_3.default);
//# sourceMappingURL=app.js.map