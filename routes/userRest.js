var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');


// function isLoggedIn (req, res, next) {
//   if (!(req.session && req.session.user)) {
//     return res.send('Not logged in!');
//   }
//   next();
// }

// app.get("/api", isLoggedIn, function (req, res) {
//    //Something private
// })


router.get('/UserByEmail',function(req,res,next){
  // res.send("This is Greaat");
  
  user_email = req.query.user_email;
    
  var User = mongoose.model('user', UserSchema);
  User.findOne({'user_email':user_email},function(err, user) {
    if (err) return console.error(err);
      if(user){
          res.send(user);
      }else{
          res.send("Invalid Email Supplied");
      }
  });


})


router.post('/login',function(req,res,next){
  
  var user_email = req.body.user_email;
  var password = req.body.password;

  var User = mongoose.model('user', UserSchema);
  // User.findOne({'user_email':user_email, 'password':hash_password},function(err, user) {
    User.findOne({'user_email':user_email},function(err, user) {
    if (err) return console.error(err);
    // res.send(user);

    if(user){
  
      if(bcrypt.compareSync(password, user.password)) {
       // Passwords match
        res.send("Success");
      } else {
       // Passwords don't match
       res.send("Invalid Password");
      }

    }else{
      res.send("Invalid Email Supplied");
    }

  });


})



/* GET users listing. */
router.post('/registerUser', function(req, res, next) {

  var password= req.body.password;

	// var hash_password = bcrypt.hashSync(password);
  var hash_password = bcrypt.hashSync(password, 8);
  // var hash_password = req.body.password;

  var UserObject = {
    user_name : req.body.user_name,
    user_email : req.body.user_email,
    password : hash_password,
    phone : req.body.phone,
    isActive : "Yes",
    user_status : "Basic",
  }

	//Add Bus Station
	 var UserModel = mongoose.model('user', UserSchema);
	 var User = new UserModel(UserObject);

	 // 	//check if eail exist in database exist
		UserModel.count({user_email:req.body.user_email}, function(err, response){
			if(err) return "Error Detected";
			
			if(response > 0){
				res.end("Email Address Previously Used");
			}else{
        // res.end("Thois is the body");

					 User.save(function(err, User) {
						  if (err) {
								// res.end("Error in Perfoming operation");
								res.end(err);
								}else{
								res.end("Success");
							}
					});
			}

		});

});

// http://stackoverflow.com/questions/31986127/how-to-make-user-registration-with-node-js-and-mongodb-using-mongoose-and-expre
// https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619


module.exports = router;
