var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
   
var app = express();
app.use(express.json());

const dbURI = "mongodb://127.0.0.1:27017";
mongoose.connect(dbURI)
    .then(() => {  
        console.log("DB connection established");
    })
    .catch(err => {
        console.log("Error in connection: " + err);
    });

const Schema = mongoose.Schema;
 
const UserSchema = new Schema({                              
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },   
});
 
const User = mongoose.model('User', UserSchema);

 
const protectAdmin = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ "message": "No token, authorization denied" });
    }

    try {
   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   
        if (req.user.role !== 'admin') {
            return res.status(403).json({ "message": "Forbidden: Admins only" });
        }

        next();  
    } catch (err) {
        res.status(401).json({ "message": "Token is not valid" });
    }
};

app.get("/user", (req, res) => {
    User.find() 
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({ "message": "Error in fetching users: " + err }));
});
app.delete("/user/:id", protectAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.status(200).json({ "message": "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ "message": "Error in deleting user: " + err });
    }
});

 
 
app.listen(3001, () => {
    console.log('Server running on port 3000');
});
