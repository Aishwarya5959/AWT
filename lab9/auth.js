const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.post("/login", (req, res) => {

    const { username, password } = req.body;
    if (username === "cvr" && password === "cvr123") {

        const token = jwt.sign({ username, password }, "college");

        res.json({ token });

    } else {

        res.status(400).json({ message: "Invalid credentials" });

    }

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Invalid token, login first" });

    }
    jwt.verify(token, "college", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token, login first" });
        }
        next();

    });
}

app.get("/protected", authenticateToken, (req, res) => {

    res.json({ message: "Welcome to the protected function" });

});
app.get("/students", (req, res) => {

    res.json({ message: "hai" });

});
app.get("/private",(req,res) => {


});
app.listen(3001, () => {

    console.log("Server started on port 3001");

});
