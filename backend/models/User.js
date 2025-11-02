const mongoose = require('mongoose')

// CONNECTING TO THE DATABASE
const connectToDatabase = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to the database!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};


// MAKING USER SCHEMA
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, //hashed
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
})

// TRANSFORMING THE PARSING 
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// MAKING THE USER MODEL
const User = mongoose.model('User', userSchema)

// EXPORTING THE MODULES
module.exports = {
    connectToDatabase,
    User
}