var express = require('express');
var mongoose = require('mongoose');
var app = express();
app.use(express.json());

const Schema = mongoose.Schema;
const dbURI = "mongodb://127.0.0.1:27017";

mongoose.connect(dbURI)
    .then(() => {
        console.log("DB connection established");
    })
    .catch(err => {
        console.log("Error in connection: " + err);
    });

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', UserSchema);

app.post("/user", (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
        .then(() => res.status(200).json({ "message": "User added successfully" }))
        .catch(err => res.status(400).json({ "message": "Error in adding user: " + err }));
});

app.listen(2000, () => {
    console.log("Server started on port 2000");
});
