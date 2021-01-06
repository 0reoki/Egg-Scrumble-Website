const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if(token) {
        jwt.verify(token,'egg-book-secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check current user and current search category
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,'egg-book-secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
               
               // res.locals.search = null;
               
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                res.locals.book = null;
                const genresource = req.query.a;
             
              //  const genre = req.url.searchParams.get("a");
               // console.log(genre);
               let book = await Book.find({genre: genresource});
               //console.log(JSON.parse(JSON.stringify(book)))
               //console.log(book[1].title + book.length);
              if (book!=null)
              {
                for (let i =0 ; i <=book.length; i++)
                {
                    res.locals.book = book;
                    res.locals.bookcount = book.length;
                }
               
              // console.log("This is me" + book);
              }
                else
                {
                
                res.locals.book = null;
             
                }
               
               res.locals.genre = genresource;
                console.log(genresource);
              
            
            if (err)
                console.log(err);
                
             //   let search = await Search.findById(decodedToken.id);
              //  res.locals.search = search;
                next();
            }
        })
    } else {
        res.locals.book = null;
                const genresource = req.query.a;
             
              //  const genre = req.url.searchParams.get("a");
               // console.log(genre);
               let book = await Book.find({genre: genresource});
               //console.log(JSON.parse(JSON.stringify(book)))
               //console.log(book[1].title + book.length);
              if (book!=null)
              {
                for (let i =0 ; i <=book.length; i++)
                {
                    res.locals.book = book;
                    res.locals.bookcount = book.length;
                }
               
              // console.log("This is me" + book);
              }
                else
                {
                
                res.locals.book = null;
             
                }
               
               res.locals.genre = genresource;
                
            

        
      
        res.locals.user = null;
        next();
    }
};
const viewBook = (req, res, next) => {
    
    
      
                let book = Book.find({genre: "Action"});
            
                book.map(function(docs){
                    console.log("Viewed"  + book);
                    JSON.stringify(book);
                    console.log(book);
        
                });
                res.locals.book = book;
             //   let search = await Search.findById(decodedToken.id);
              //  res.locals.search = search;
        location.reload
        next();
    
};


module.exports = { requireAuth, checkUser, viewBook};