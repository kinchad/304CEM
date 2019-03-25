const Express = require('express')
const mysql = require('mysql')

var app = Express()
var port = 7777
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'forex',
    dbPort:'3306'
})
app.post('/login',function(req,res){
    
})
app.post('/register',function(req,res){
    sql = 'select * from user'
    con.query(sql,function(err,result){
        if(err) throw err
        res.send("POST & Query SUCCESS")
    })
})

app.listen(port)
console.log("Web API Forex is running at port "+port+" ...")