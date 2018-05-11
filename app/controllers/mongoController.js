var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    var RubroFederacion = require('./rubroFederacion.js');
    var GastoGubernamental = require('./gastosGobierno');
    dbUrl = 'mongodb://mongo:27017/datosLibres';


    
    /******************************************controller para federaciones deportivas.*******************/
    get = function (req, res) {
        mongoose.connect(dbUrl,{ keepAlive: 120 });
        var db = mongoose.connection;
        db.once('open', function() {
            var query = RubroFederacion.find()
            .where("UNIDAD EJECUTORA").regex(/^FEDERACIÓN/i)
            .select({"NOMBRE ENTIDAD":1, "NOMBRE GRUPO GASTO":1, "NOMBRE RENGLÓN":1,"ASIGNADO":1,"_id":0})
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                res.send(result);
            });
        });
    };


    /******************************************controller para gastos gubernamentales.*******************/

    getGasto = function (req, res) {
        mongoose.connect(dbUrl,{ keepAlive: 120 });
        var db = mongoose.connection;
        db.once('open', function() {
            var query = GastoGubernamental.find()
            .where("ESTATUS DEL CONCURSO").regex(/^Terminado adjudicado/i)
            .where("AÑO DE ADJUDICACIÓN").regex(/^2018/i)
            //{"ESTATUS DEL CONCURSO":"Terminado adjudicado","AÑO DE ADJUDICACIÓN":"2018"}
            .select({"ENTIDAD COMPRADORA":1, "CATEGORÍAS":1, "MONTO":1,"_id":0})
            .exec(function (err, result) {
                if (err) {
                    throw err;
                }
                res.send(result);   
            });
        });
    };

module.exports.get = get;
module.exports.getGasto=getGasto;