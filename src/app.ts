const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

import recipeRoutes from './recipes/route'
import ingredientRoutes from './ingredients/route'
import userRoutes from './user/route'

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
app.use('/recipes', recipeRoutes)
app.use('/ingredients', ingredientRoutes)
app.use('/users', userRoutes)
