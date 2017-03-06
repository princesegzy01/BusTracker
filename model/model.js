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



//Routes
RouteSchema = new mongoose.Schema({
  name:  String,
  date: { type: Date, default: Date.now },
  stations : [{station_id: String}]
  // stations : [{ id : String, station_id: String}]
});


//Operator Schema
OperatorSchema = new mongoose.Schema({
  name:  String,
  phone:  String,
  email:  String,
  state:  String,
  address:  String,
  date: { type: Date, default: Date.now }
});


//Operator Schema
BusSchema = new mongoose.Schema({
  name:  String,
  operator:  String,
  plate_no:  String,
  size:  String,
  color:  String,
  isActive : String,
  tracker : String,
  route : String,
  date: { type: Date, default: Date.now }
});
BusAutomobile = mongoose.model('bus_vehicle', BusSchema);

//Operator Schema
TrackerSchema = new mongoose.Schema({
  name:  String,
  imei : String,
  manufacturer : String,
  model : String,
  phone : String,
  tracker_api_id : String,
  isActive : String,
  date: { type: Date, default: Date.now }
});
Tracker = mongoose.model('tracker', TrackerSchema);


//Trip Schema
TripSchema = new mongoose.Schema({
  user_id :  String,
  user_name : String,
  user_email : String,
  pickup : {
    name :String,
    state : String,
    latitude : String,
    longitude : String
  },
  destination : {
    name :String,
    state : String,
    latitude : String,
    longitude : String
  },
  status : String,
  date: { type: Date, default: Date.now }
});
//Trip = mongoose.model('trip', TripSchema);


//Feed Scheama
FeedSchema =  new mongoose.Schema({
  customer : String,
  route : String,
  post : String,
  like :  [
            {
              customer : String,
              date: { type: Date, default: Date.now }

            }
          ],
  comment :  [
          {
            customer : String,
            post : String,
            date: { type: Date, default: Date.now }
          }
        ],
  date: { type: Date, default: Date.now }
});


//These are are all exported Models
module.exports = {
    StatesSchema: StatesSchema,
    BusStationSchema: BusStationSchema,
    RouteSchema : RouteSchema,
    OperatorSchema:OperatorSchema,
    // BusSchema:BusSchema,
    TrackerSchema : TrackerSchema,
    BusAutomobile : BusAutomobile,
    Tracker : Tracker,
    TripSchema : TripSchema
};



// var BusStation = mongoose.model('BusStation', BusStationSchema);
// module.exports = BusStation;


// var BusStation = module.exports = mongoose.model('BusStation', BusStationSchema);

// var Product = new Schema({
//     upc             : { type: String, required: true, index: { unique: true } },
//     description     : { type: String, trim: true },
//     size_weight     : { type: String, trim: true }
// });