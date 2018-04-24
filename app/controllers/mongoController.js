var express = require('express'),
    router = express.Router(),
    mongoClient = require('mongodb').MongoClient,
    //dbUrl = 'mongodb://127.0.0.1:27017/',
    dbUrl = 'mongodb://mongo:27017/';

    connect = function () {
        mongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                throw err;
            }
            var database = db.db('datosLibres');
            database.createCollection('presupuesto', function (err) {
                if (err) {
                    throw err;
                }
                console.log("Collection presupuesto created");
                db.close();
            });
        });
        console.log('MongoDB connection successful');
    },

    insert = function (req){
        mongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                throw err;
            }
            var database = db.db('datosLibres');
            database.collection('presupuesto').update({name: "top" },
                {name: "top", result: req.body},
                {upsert: true }, function (err) {
                if (err) {
                    throw err;
                }
                console.log("1 document inserted");
                db.close();
            });
        });
    },
    insertMongo = function (req, collectionName){
        mongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                throw err;
            }
            var database = db.db('datosLibres');
            database.collection(collectionName).update({name: "top" },
                {name: "top", result: req.body},
                {upsert: true }, function (err) {
                if (err) {
                    throw err;
                }
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    get = function (req, res) {
        mongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                throw err;
            }
            var dbo = db.db("datosLibres");
            dbo.collection("presupuesto").findOne({name: "top"}, function (err, result) {
                if (err) {
                    throw err;
                }
                db.close();
                res.send(result);
            });
        });
    };

module.exports.get = get;
module.exports.insert = insert;
module.exports.connect = connect;