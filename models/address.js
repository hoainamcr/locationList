var mongoose = require('mongoose');

// Address Schema

var addSchema = mongoose.Schema({
    street: String,
    ward: String,
    District: String,
    city: String,
    country: String
}, {collection: 'listlocation'});

var Address = module.exports = mongoose.model('Address', addSchema);

//Get address
module.exports.getAddress = function(callback, limit){
    Address.find(callback).limit(limit);
}

// ger address by id
module.exports.getAddressById = function(id, callback){
    Address.findById(id, callback);
}

// Add address
module.exports.AddAddress = function(location, callback){
    Address.create(location, callback);
}

// update address
module.exports.UpdateAddress = function(id, location, option, callback){
    var query = {_id: id};
    var update = {
        street: location.street,
        ward: location.ward,
        District: location.District,
        city: location.city,
        country: location.country
    }
    Address.findOneAndUpdate(query, update, option, callback);
}

// Del address
module.exports.DelAddress = function(id, callback){
    var query = {_id: id};
    Address.remove(query, callback);
}