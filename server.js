const Express = require ('express')
const BodyParser = require('body-parser')
const forexClient = require('./routes/forexClient')
const App = Express()

App.set('views', path.join(__dirname, 'views'))
App.set('view engine','ejs')
App.use(Express.static('public'))
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
App.use('/', forexClient)


const port = 8080

App.listen(port, () => {
    console.log(`Web Server is up and running on port numbet ${port}`)
})