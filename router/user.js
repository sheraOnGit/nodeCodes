const express = require('express');
const path = require('path');
const fs = require('fs');


var authModule = require(path.join(__dirname,'../Functional Code/authPost.js'));
const router = express.Router();

router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../view/login.html'));
});

router.get('/auth',(req,res,next)=>{
    res.redirect('/login');
    console.log("redirected on get on auth");
});

router.post('/auth',(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    console.log("A request coming for "+username);
    if(username && password){
        authModule.doAuth(username,password,(authstatus,item)=>{
            if(authstatus){
                //res.send("<h1>"+item.username+"</h1>");
                res.render('loggedShop.ejs',{name:item});
            }
            else{
                res.send("<h1>Invalid credential</h1>");
            }
        });
    }   
});


router.get('/signup',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../view/signUp.html'));
});



var obj = {
    schema: []
 };
router.post('/add-user',(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    obj.schema.push({"username": username, "password":password});
    var stringData = JSON.stringify(obj);
    fs.appendFile(path.join(__dirname,'../userDb/userfile.json'),stringData,(err)=>{
        console.log("error occured while writing in file");
    });
    res.send("<h1>Registerd</h1>");
});

module.exports = router;