swig = require('swig')

exports.home = function(req,res){
	var template = swig.compileFile('./public/html/index.html')
	var output = template({})
	res.send(output)
}
exports.currencyData = function(req,res){
    var template = swig.compileFile('./public/html/forex.ejs')
	var output = template({})
    res.send(output)
}
exports.forecast = function(req,res){
	var template = swig.compileFile('./public/html/forecast.html')
	var output = template({})
	res.send(output)
}
exports.login = function(req,res){
	var template = swig.compileFile('./public/html/login.html')
	var output = template({})
	res.send(output)
}
exports.register = function(req,res){
	var template = swig.compileFile('./public/html/register.html')
	var output = template({})
	res.send(output)
}