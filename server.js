 

var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
app.use(express.json());

const Schema = mongoose.Schema;
const dbURI = "mongodb://127.0.0.1:27017/ecommerce";  

mongoose.connect(dbURI)
    .then(() => {  
        console.log("DB connection established");
    })
    .catch(err => {
        console.log("Error in connection: " + err);
    });

 
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
 
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ "message": "User exists" });

        const newUser = new User({ name, email, password });  
        await newUser.save();

        res.status(200).json({ "message": "User added successfully" });
    } catch (err) {
        res.status(400).json({ "message": "Error in adding : " + err });
    }
});
 
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ "message": "Invalid  " });
 
        if (user.password !== password) return res.status(400).json({ "message": "Invalid  " });

        const token = jwt.sign({ userId: user._id, email: user.email }, "ecommerce",  );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ "message": "Server error: " + err });
    }
});
 
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied " });

    jwt.verify(token, "ecommerce", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid Token " });

        req.user = decoded;  
        next();
    });
}
 
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', ProductSchema);
 
app.post("/api/products", async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        const newProduct = new Product({ name, description, price, category, stock });
        await newProduct.save();

        res.status(200).json({ "message": "Product added  " });
    } catch (err) {
        res.status(400).json({ "message": "Error : " + err });
    }
});
 
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ "message": "Error in fetching products: " + err });
    }
});
 
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ "message": "Product not found" });

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ "message": "Error in fetching  : " + err });
    }
});
 
app.put("/api/products/:id", async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, stock }, { new: true });
        if (!product) return res.status(404).json({ "message": "  not found" });

        res.status(200).json({ "message": "Product updated  ", product });
    } catch (err) {
        res.status(400).json({ "message": "Error in updating : " + err });
    }
});
 
app.delete("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ "message": "Product not found" });

        res.status(200).json({ "message": "Product deleted  " });
    } catch (err) {
        res.status(400).json({ "message": "Error in deleting  : " + err });
    }
});
 
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
