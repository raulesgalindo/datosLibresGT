var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rubroSchema = new Schema({
    _id: {type:String},
    "ENTIDAD COMPRADORA": {type:String},
    "CATEGORÍAS": {type:String},

});
module.exports = mongoose.model('gastosgubernamentales', rubroSchema);; 