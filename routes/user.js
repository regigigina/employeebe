const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/new", (req, res) => {
    
    let newObj = new User({
        username : req.body.username,
        password : req.body.password
    });

    newObj.save((error) => {
        if (error){
            res.status(500).send(error);
        }
        else{
            res.json(newObj);
        }
    });

});

// router.delete("/:id", (req, res) => {       
//     User.findByIdAndRemove(req.params.id, (error, result) => {
//         if(error){
//             res.status(500).json(error);
//         }
//         else{
//             res.json({ message : "Data deleted." });
//         }
//     });
// });

// router.put("/", (req, res) => {

//     let newObj = {
//         username : req.body.username,
//         password : req.body.password,
//     };
    
//     User.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
//         if(error){
//             res.status(500).json({ message : "Error" });
//         }
//         else{
//             res.json({ message : "Data updated." });
//         }
//     });

// });

router.post("/login", (req, res) => {

    User.findOne({ username : req.body.username, password : req.body.password }, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({ message : "User not found." })
        }
        else{
            const payload = {
                id : result._id,
                name : result.username
            };

            const token = jwt.sign(payload, "secretkey", { expiresIn : 300 });

            res.json({ token : token });
        }
    });

});

module.exports = (function(){
    return router;
})();