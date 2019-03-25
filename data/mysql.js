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

app.get('/allCurrency',function(req,res){    
        sql = 'select * from currency'
        //sql = 'insert into currency values("USD/JPY",110.75,110.75200,null,"2019-02-21 00:00:08")'
        con.query(sql,function(err,result){
            if(err) throw err
            res.send(result)
            //console.log("1 record inserted");
        })
})

app.get('/allName',function(req,res){
    sql = 'select name from currency'
    con.query(sql,function(err,result){
        if(err) throw err
        res.send(result)
    })
})

app.listen(port)
console.log("Web API Forex is running at port "+port+" ...")