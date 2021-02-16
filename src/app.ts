const express = require("express");
const app = express();
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.get("/url", function (req: any, res: any, next: any) {
    const test: String = "test"
    res.json([test]);
});
