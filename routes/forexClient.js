const express=require('express')
const route=express.Router()
const client_control = require('../controllers/forexClient')

const {validate, ValidationError} = require('express-json-validator')
const bookSchema = require('../models/forex').bookSchema

//const validator = Valiadtor.validate

route.get('/', client_control.home)
route.get('/currencyData',client_control.currencyData)
route.get('/forecast',client_control.forecast)
route.get('/login',client_control.login)
route.get('/register',client_control.register)

module.exports = route

//exports.validate = validator.validate()

route.use((err, req, res, next)=> {
    if(err){
        if(err instanceof ValidationError) {
            res.status(422).send({"status": 422, "description" : err.message})   // Unprocessable Entity
        } else {
            console.log(err)
        }
    } else {
        next()
    }
})