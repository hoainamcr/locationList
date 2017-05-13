var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static("src"), bodyParser.json());
// app.use(bodyParser.json());
app.set("view engine", "html");
app.set("html", "./src");

Address = require('./models/address');

// connect mongoDB
mongoose.connect('mongodb://localhost:27017/location');
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connect err'));
db.once('open', function(){
    console.log('mongodb connect');
})

app.get("/", function(req, res){
    res.render('index');
})

// Get data
app.get("/api/locationlist", function(req, res){
    Address.getAddress(function(err, address){
        if(err){
            throw err;
        }
        res.json(address);
    })
})

// Get data by ID
app.get("/api/location/:_id", function(req, res){
    Address.getAddressById(req.params._id, function(err, address){
        if(err){
            throw err;
        }
        res.json(address);
    })
})

// Add new data
app.post("/api/addlocation", function(req, res){
    var addr = req.body;
    Address.AddAddress(addr, function(err, address){
        if(err){
            throw err;
        }
        res.json(address);
    })
})

// update a data
app.put("/api/updatelocation/:_id", function(req, res){
    var id = req.params._id;
    var addr = req.body;
    Address.UpdateAddress(id, addr, {}, function(err, address){
        if(err){
            throw err;
        }
        res.json(address);
    })
})

// Del new data
app.delete("/api/deletelocation/:_id", function(req, res){
    var id = req.params._id;
    var addr = req.body;
    Address.DelAddress(id, function(err, address){
        if(err){
            throw err;
        }
        res.json(address);
    })
})

app.listen(3000, () => console.log('Runing on http://localhost:3000'));

