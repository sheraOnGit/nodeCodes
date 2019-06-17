const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const userRouter = require(path.join(__dirname,'/router/user.js'));
const adminRouter = require(path.join(__dirname,'/router/admin.js'));

const app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));

// app.use(bodyParser.json());

app.use(userRouter);
app.use(adminRouter);

app.listen(3000);