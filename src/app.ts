const express = require("express");
const app = express();
const cors = require("cors");

import recipeRoutes from './recipes/route'
import ingredientRoutes from './ingredients/route'


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
app.get("/url", function (req: any, res: any, next: any) {
    const test: String = "test"
    res.json([test]);
});

/* Routes */
app.use('/recipes', recipeRoutes)
app.use('/ingredients', ingredientRoutes)
