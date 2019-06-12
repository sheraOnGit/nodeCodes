const async = require('async');
const fs = require('fs');
const path = require('path');

var authModule = module.exports= {};

var authstatus = false;

authModule.doAuth=function authenticator(username,password,callback){
    async.waterfall([function storeContent(done){
        fs.readFile(path.join(__dirname,'../userDb/userfile.json'),(err,data)=>{
            if(!err){
                var jsonData = JSON.parse(data);
                for(item in jsonData){
                    if((username == (jsonData[item].username)) &&(password == (jsonData[item].password))){
                        authstatus = true;
                        done(null,jsonData[item]);
                        break;
                    }          
                }
                if(!authstatus){
                    done("invalid credential",null);
                }
            }
            else{
                console.log(err);
                done("error occured:"+err,null);
            }
        });
    }
    ],(err,success)=>{
        if(!err){
            console.log(success);
            callback(authstatus,success);
        }
        else{
            console.log(err);
            callback(authstatus,"invalid");
        }
    });
}