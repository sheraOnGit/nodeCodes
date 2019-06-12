const express = require('express');
const path = require('path');
const fs = require('fs');
const async = require('async');



const router = express.Router();

router.get('/getList',(req,res,next)=>{
    async.waterfall([
        function readFile(done){
            fs.readFile(path.join(__dirname,'../userDb/userfile.json'),(err,data)=>{
                if(!err){
                    done(null,data);
                }
                else{
                    done("error occured while reading file",null);
                    console.log(err);
                }
            });
        }
    ],
    (err,success)=>{
            if(!err){
                res.send(JSON.parse(success));
            }
            else{
                res.send("Error occured");
            }
    });
});

module.exports = router;