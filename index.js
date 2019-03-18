'use strict'

const restify = require('restify')
const server = restify.createServer()

const port = 8000

server.listen(port,err=>{
	if(err){
		console.error(err)
	}else{
		console.log('App is ready on port ${port}')
	}
})
