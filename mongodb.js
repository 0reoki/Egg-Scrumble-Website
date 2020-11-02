// Examples

// URL "mongodb+srv://Admin:Admin@eggbook.y0biq.mongodb.net/eggbook_db?retryWrites=true&w=majority"

// Database name: eggbook_db

// Collections:
// books 
// owned_books 
// users:
// var user_info = {
//     _id : created automatically on mongo if not specified.
//     email : "",
//     password : "",
//     first_name : "",
//     last_name : "",
//     birthdate : 2000-01-01,
//     sex : "Male"
// }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:Admin@eggbook.y0biq.mongodb.net/eggbook_db?retryWrites=true&w=majority";

// Connect to our database
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//     if (err) throw err;
//     console.log("Connected...");
//     db.close();
// });

// Insert data to our database
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("eggbook_db"); //Database name
//     var myobj = { email: "ken@gmail.com", password: "Admin123" }; //Object to be inserted inside collection
//     dbo.collection("users").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("Document inserted...");
//         db.close();
//     });
// });

//Insert multiple documents
// MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var myobj = [
//     { email: 'Joseph', password: 'Joseph123'},
//     { email: 'Deyb', password: 'Deyb123'},
//     { email: 'Norman', password: 'Norman123'},
//     { email: 'Perez', password: 'Perez123'}
//   ];
//   dbo.collection("users").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Documents inserted...");
//     db.close();
//   });
// });

//Find data from our database
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   dbo.collection("users").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Find data with dot operator
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   dbo.collection("users").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.email); // email is from users collection
//     db.close();
//   });
// });

// Find all
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   dbo.collection("users").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Find all with parameter
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   dbo.collection("users").find({}, { projection: { _id: 0, email: 'ken'} }).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//     // you may include _id: 0 inside projection to hide id 
//   });
// });

// Filter result with query
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var query = { email: "ken.nakata@tup.edu.ph" };
//   dbo.collection("users").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Filter result with regular expression. Will return results starting with letter k
// MongoClient.connect(url, {useUnifiedTopology: true},function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var query = { email: /^k/ };
//   dbo.collection("users").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Sort alphabetically
// 1 for ascending, -1 for descending
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var mysort = { email: 1 };
//   dbo.collection("users").find().sort(mysort).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Delete document
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var myquery = { email: 'ken@gmail.com' };
//   dbo.collection("users").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("Document deleted...");
//     db.close();
//   });
// });

// Delete many (don't use plz)
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var myquery = { email: /^k/ };
//   dbo.collection("users").deleteMany(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log(obj.result.n + " document(s) deleted");
//     db.close();
//   });
// });

// Update document
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var myquery = { email: "ken@gmail.com" };
//   var newvalues = { $set: {first_name: "Ken", last_name: "Nakata"} }; // you can also use it to just insert new data within document
//   dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("Document updated...");
//     db.close();
//   });
// });

// Update many documents
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   var myquery = { email: /^k/ };
//   var newvalues = {$set: {name: "Ken"} };
//   dbo.collection("users").updateMany(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log(res.result.nModified + " document(s) updated");
//     db.close();
//   });
// });

// Limiting the result
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("eggbook_db");
//   dbo.collection("users").find().limit(1).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });