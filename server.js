
const express=require("express");
const appnew=new express();
const morgan=require('morgan');
const methodOverride = require("method-override");
appnew.use(morgan('dev'));
appnew.use(methodOverride("_method")); 
appnew.set('view engine','ejs');
appnew.set('views',__dirname+'/views');
appnew.use(express.static('public'));

const navbar=[{link:'/basic',name:'Home'},
{link:'/basic/form',name:'Add Employee'}
]
const basicroutes=require('./routes/basics')(navbar);
const { link } = require("fs");
const { name } = require("ejs");
appnew.use('/basic',basicroutes);
appnew.use(express.urlencoded({ extended: true }));


appnew.listen(4000,()=>{
    console.log('server is listening on PORT 4000');
 })
 