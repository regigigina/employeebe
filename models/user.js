const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/employeemanagement", { useMongoClient : true });
mongoose.connect("mongodb://student:abc123@ds255787.mlab.com:55787/heroku_d869qk08", { useMongoClient : true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String
});

const User = mongoose.model("user-rwong", userSchema);

module.exports = User;