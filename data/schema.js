const Express = require('express')
const BodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const CONNECTION_URL = 'mongodb+srv://kin03070:21444531@cluster0-szlew.azure.mongodb.net/test?retryWrites=true'
const DATABASE_NAME = 'forex'

var app = Express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))

var database, collection

var result=''
app.get('/allPrice',(req,res)=>{
    console.log("someone request to get all books from database")
    var records = collection.find()
    records.forEach(function(record){
        if(record != null){
            console.log(record)
            result = result + JSON.stringify(record)
        }
    },function(err){
        if(err){
            res.status(500).send(err)
        }
        console.log(result)
        res.send(result)
    })
})

app.get('/writePrice',(req,res)=>{
    collection.updateOne({'bidPrice':1.3},{
        'bidPrice':1.7,
        'time':'12:54'
    })
})

app.get('/updatePrice',(req,res)=>{
    collection.updateOne(
        {'bidPrice':1.3},
        {$set:{'time':'12:45'}},
        {upsert:true}
    );
})

app.listen(10888,()=>{
    MongoClient.connect(CONNECTION_URL,{useNewUrlParser: true},
        (error,client)=>{
            if(error){
                throw error
            }
            database = client.db(DATABASE_NAME)
            collection = database.collection('currency')
            console.log("Connected to `"+DATABASE_NAME+"`!")
        })
})