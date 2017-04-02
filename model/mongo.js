var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/mydb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var movieSchema  = {
    "name" : String,
    "degree" : String,
    "age":Number
};
// create model if not exists.
module.exports = mongoose.model('movies',movieSchema);
