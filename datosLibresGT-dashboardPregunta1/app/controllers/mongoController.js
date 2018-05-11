var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    var RubroFederacion = require('./rubroFederacion.js');
    var GastoGubernamental = require('./gastosGobierno');
    //mongoClient = require('mongodb').MongoClient,
    //dbUrl = 'mongodb://127.0.0.1:27017/',
    dbUrl = 'mongodb://mongo:27017/datosLibres';


    
    /******************************************controller para federaciones deportivas.*******************/
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

    get = function (req, res) {
        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            var query = RubroFederacion.find();
            query.where("UNIDAD EJECUTORA").regex(/^FEDERACIÓN/i);
            query.select({"NOMBRE ENTIDAD":1, "NOMBRE GRUPO GASTO":1, "NOMBRE RENGLÓN":1,"ASIGNADO":1,"_id":0});
            query.exec(function (err, result) {
                if (err) {
                    throw err;
                }
                db.close();
                res.send(result);
            });
        });
    };






    /******************************************controller para gastos gubernamentales.*******************/

    getGasto = function (req, res) {
        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            var query = GastoGubernamental.find();
            query.where("ESTATUS DEL CONCURSO").regex(/^Terminado adjudicado/i);
            query.where("AÑO DE ADJUDICACIÓN").regex(/^2018/i);
            //{"ESTATUS DEL CONCURSO":"Terminado adjudicado","AÑO DE ADJUDICACIÓN":"2018"}
            query.select({"ENTIDAD COMPRADORA":1, "CATEGORÍAS":1, "MONTO":1,"_id":0});
            query.exec(function (err, result) {
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
module.exports.getGasto=getGasto;