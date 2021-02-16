const express = require("express");
const app = express();
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.get("/url", function (req, res, next) {
    const test = "test";
    res.json([test]);
});
//# sourceMappingURL=app.js.map