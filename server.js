var express     =   require("express");
var bodyParser  =   require("body-parser");
var mongoOp=require("./model/mongo.js");


var app         =   express();
var router      =   express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

// GET /users – Return all Users from MongoDB
// POST /users – Add new user in MongoDB
// GET /users/:id – Return User with matched ID
// PUT /users/:id – Update users information
// DELETE /users/:id – Delete particular user
router.get("/users",function(req,res){
          var response = {};
          mongoOp.find({},function(err,data){
          // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  response = {"error" : false,"message" : data};
              }
              res.json(response);
          });
});
router.post("/users",function(req,res){
          var db = new mongoOp();
          var response = {};
          // fetch email and password from REST request.
          // Add strict validation when you use this in Production.
          db.name = req.body.name;
          db.degree = req.body.degree; 
          db.age = parseInt(req.body.age);
          // Hash the password using SHA1 algorithm.
          // db.degree =  require('crypto')
          //                   .createHash('sha1')
          //                   .update(req.body.password)
          //                   .digest('base64');
          db.save(function(err){
          // save() will run insert() command of MongoDB.
          // it will add new data in collection.
              if(err) {
                  response = {"error" : true,"message" : "Error adding data"};
              } else {
                  response = {"error" : false,"message" : "Data added"};
              }
              res.json(response);
          });
});


router.get("/users/:id",function(req,res){

});
router.put("/users/:id",function(req,res){

});

router.delete("/users/:id",function(req,res){

});
// router.post("/increment/:id",function(req,res){
//     res.json({"error" : false,"message" : ""+parseInt(req.params.id)+1});
// });
//
// router.post("/decrement/:id",function(req,res){
//     res.json({"error" : false,"message" : ""+parseInt(req.params.id)-1});
// });



app.use('/',router);

app.listen(8383);

console.log("Listening to PORT 8383");
