var swig = require('swig')
var express = require('express')

var app = express()
var port = 8080
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.post('/',function(req,res){
	var output = "test post"
	res.send(output)
})

app.get('/',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/index.html')
	var output = template({})

	res.send(output)
})

app.get('/myForm',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/myForm.html')
	var output = template({})
	res.send(output)
})

app.get('/forex',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/forex.html')
	var output = template({})
	res.send(output)
})
app.get('/forecast',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/forecast.html')
	var output = template({})
	res.send(output)
})
app.get('/login',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/login.html')
	var output = template({})
	res.send(output)
})
app.get('/register',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/register.html')
	var output = template({})
	res.send(output)
})

app.listen(port)
console.log("Web Server is running at port "+port+" ...")

require('./data/mysql.js')


