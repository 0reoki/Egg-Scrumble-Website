const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Book = require('../models/Book');



const search_post = (req, res) => {
    const token = req.cookies.jwt;
    const {search} = req.body;
    
    const decodedtoken = jwt.decode(token);
    var user_id = decodedtoken.id
User.findByIdAndUpdate(user_id, { $push:{ search_history: { $each: [search], $position: 0}}}, 
                            function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated Search History"); 
    }
    });
   res.redirect('/');
}

const viewbooks_post = (req, res) => {
    const { genre } = req.body;

    Book.find({ genre: genre}, function (err, docs) {
        
        if (err)
        console.log(err)
        else
        {
        console.log(docs)
        res.redirect('/?a='+genre);
        }});
 
       
    }


module.exports = {
    search_post,
    viewbooks_post
}
