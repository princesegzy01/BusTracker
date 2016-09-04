var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Bus Station
BusStationSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    state        : { type: String, required: true },
    longitude        : { type: String, required: true },
    latitude        : { type: String, required: true },
    date_created    : { type: Date, required: true, default: Date.now }
}); 
// module.exports = BusStationSchema;



//Get States
StatesSchema = new mongoose.Schema({
    states_name     : { type: String, trim: true }
});
// module.exports = StatesSchema;



//Rotes
RouteSchema = new mongoose.Schema({
  name:  String,
  date: { type: Date, default: Date.now },
  stations : [{station_id: String}]
  // stations : [{ id : String, station_id: String}]
});


module.exports = {
    StatesSchema: StatesSchema,
    BusStationSchema: BusStationSchema,
    RouteSchema : RouteSchema
};



// var BusStation = mongoose.model('BusStation', BusStationSchema);
// module.exports = BusStation;


// var BusStation = module.exports = mongoose.model('BusStation', BusStationSchema);

// var Product = new Schema({
//     upc             : { type: String, required: true, index: { unique: true } },
//     description     : { type: String, trim: true },
//     size_weight     : { type: String, trim: true }
// });