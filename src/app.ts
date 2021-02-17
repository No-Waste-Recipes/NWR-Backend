const express = require("express");
const app = express();

import recipeRoutes from './recipes/route'


app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.get("/url", function (req: any, res: any, next: any) {
    const test: String = "test"
    res.json([test]);
});

/* Routes */
app.use('/recipes', recipeRoutes)
