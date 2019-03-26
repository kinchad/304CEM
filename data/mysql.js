const Express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

var expressValidator = require('express-validator')
var check = require('express-validator/check').check
var validationResult = require('express-validator/check').validationResult

var dataHandler = Express()
var port = 7777
var md5 = require('md5')

dataHandler.use(bodyParser.urlencoded({extended:true}))
dataHandler.use(bodyParser.json());

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'forex',
    dbPort:'3306'
})
dataHandler.post('/login',function(req,res){
    
})
dataHandler.post('/register',[
    check('name').isAlphanumeric(),
    check('login').isAlphanumeric().isLength({min:3}),
    check('password').isAlphanumeric().isLength({min:3}),
    check('confirmPwd').custom((value,{req,loc,path})=>{
        if(value!==req.body.password){
            throw new Error('Passwords dont match')
        }else{
            return value
        }
    })
],function(req,res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.mapped()})
    }
    var login = req.body.login
    var password = req.body.password
    var confirmPwd = req.body.confirmPwd
    var name = req.body.name
    var email = req.body.email
    sql = 'insert into user values("'+login+'","'+md5(password+'forexWEB')+'","'+name+'","'+email+'")'
    con.query(sql,function(err,result){
        if(err) throw err
        res.send(
            '<script>alert("Success.");</script>'+
            '<br><a href="http://localhost:8080/">Back to home page</a>'
        )
    })
})

dataHandler.listen(port)
console.log("Data handler is running at port "+port+" ...")