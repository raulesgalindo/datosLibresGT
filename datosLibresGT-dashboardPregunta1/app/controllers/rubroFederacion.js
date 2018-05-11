var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rubroSchema = new Schema({
    _id: {type:String},
    "NOMBRE ENTIDAD": {type:String},
    "NOMBRE GRUPO GASTO": {type:String},

});
module.exports = mongoose.model('rubrosfederacionesdeportivas', rubroSchema);; 