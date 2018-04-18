var express = require('express'),
    router = express.Router(),    
    mongoClient = require('mongodb').MongoClient,
    dbUrl = 'mongodb://127.0.0.1:27017/';
    //dbUrl = 'mongodb://mongo:27017/';

connect = function(req, res) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;         
        var database = db.db('datosLibres');   
        database.createCollection('presupuesto', function(err, collection) {
        if (err) throw err;
        console.log("Collection presupuesto created");
        db.close();
        });        
    });
    console.log('MongoDB connection successful');
}

insert = function(req, res){
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) throw err;
        var database = db.db('datosLibres');
        var obj = req.body;
        database.collection('presupuesto').update({ name: "top" }, {name:"top", result:req.body}, { upsert: true }, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

module.exports.insert = insert;
module.exports.connect = connect;