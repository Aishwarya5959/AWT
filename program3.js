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
 
app.get("/user", (req, res) => {
    User.find() 
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({ "message": "Error in fetching users: " + err }));
});
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);  
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  });
app.put("/user/:id", (req, res) => {
    const userName = req.params.name;  
    const updatedUser = req.body;  
    
    User.findOneAndUpdate({name:userName}, updatedData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ "message": "User not found" });
            }
            res.status(200).json({ "message": "User updated successfully", User });
        })
        .catch(err => res.status(400).json({ "message": "Error in updating user: " + err }));
});
app.listen(3001, () => {
    console.log("Server started on port 2000");
});
