var swig = require('swig')
var express = require('express')

var app = express()
var port = 8080
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){
	var template = swig.compileFile(__dirname + '/public/html/cv.html')
	var output = template({})

	res.send(output)
})

app.get('/myForm',function(req,res){
	var template = swig.compileFile(__dirname + '/public/myForm.html')
	var output = template({})
	res.send(output)
})

app.post('/myPost',function(req,res){
	var output = "test post"
	res.send(output)
})

app.listen(port);

