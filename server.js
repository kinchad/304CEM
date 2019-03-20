var swig = require('swig')
var express = require('express')

var app = express()
var port = 8080
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

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

app.get('/Page1',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/Page1.html')
	var output = template({})
	res.send(output)
})
app.get('/Page2',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/Page2.html')
	var output = template({})
	res.send(output)
})
app.get('/Page3',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/Page3.html')
	var output = template({})
	res.send(output)
})

app.listen(port);