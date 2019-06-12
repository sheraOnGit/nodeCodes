const path = require('path');
const fs = require('fs');

var addUser = {
    "username" : "RAVI",
    "password" : "SHEKHAR"
};

var userDataString = JSON.stringify(addUser);

fs.writeFile(path.join(__dirname,'/userDb/userfile.json'),userDataString,(err)=>{

});

fs.readFile(path.join(__dirname,'/userDb/userfile.json'),(err,data)=>{
    if(!err){
        //convert string into JSON object
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        console.log(jsonData.username);
        console.log(jsonData.password);
        
        //convert JSON object to String
        var stringJson = JSON.stringify(jsonData);
        console.log(stringJson);
    }
});



