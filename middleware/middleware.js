const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'egg-book-secret', (err, decodedToken) => {
            if (err) {
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
const checkUser = async(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'egg-book-secret', async(err, decodedToken) => {
            if (err) {
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
                const searchsource = req.query.s;
                let book;
                console.log(searchsource);
                //  const genre = req.url.searchParams.get("a");
                // console.log(genre);
                if (genresource != null) {
                    book = await Book.find({ genre: genresource });
                }

                //not yet done for search book
                if (searchsource != null) {
                    book = await Book.find({ title: { $regex: new RegExp(searchsource, "i") } });
                    console.log("search " + searchsource)
                    console.log(book)
                }
                //
                //console.log(JSON.parse(JSON.stringify(book)))
                //console.log(book[1].title + book.length);
                if (book != null) {
                    for (let i = 0; i <= book.length; i++) {
                        res.locals.book = book;
                        res.locals.bookcount = book.length;
                    }

                    // console.log("This is me" + book);
                } else {

                    res.locals.book = null;

                }

                res.locals.genre = genresource;
                res.locals.search = searchsource;



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
        const searchsource = req.query.s;
        let book;

        //  const genre = req.url.searchParams.get("a");
        // console.log(genre);
        if (genresource != null) {
            book = await Book.find({ genre: genresource });
        }
        if (searchsource != null) {
            book = await Book.find({ title: { $regex: new RegExp(searchsource, "i") } })
            console.log("search " + searchsource)
            console.log(book)
        }
        //console.log(JSON.parse(JSON.stringify(book)))
        //console.log(book[1].title + book.length);
        if (book != null) {
            for (let i = 0; i <= book.length; i++) {
                res.locals.book = book;
                res.locals.bookcount = book.length;
            }

            // console.log("This is me" + book);
        } else {

            res.locals.book = null;

        }

        res.locals.genre = genresource;
        res.locals.search = searchsource;




        res.locals.user = null;
        next();
    }
};

//displaying chosen products in a seperate page
const viewProduct = async(req, res, next) => {


    const bookID = req.query.b;
    if (bookID) {
        let book = await Book.findById({ _id: bookID }).exec();
        res.locals.book = book;
    }
    if (searchsource != null) {
        book = await Book.find({ title: { $regex: new RegExp(searchsource, "i") } });
        console.log("search " + searchsource)
        console.log(book)
    }
    //
    //console.log(JSON.parse(JSON.stringify(book)))
    //console.log(book[1].title + book.length);
    if (book != null) {
        for (let i = 0; i <= book.length; i++) {
            res.locals.book = book;
            res.locals.bookcount = book.length;
        }

    next();

    //test
    }
};
//display items in cart
const viewCart = async(req, res, next) => {
    
    const token = req.cookies.jwt;
    const decodedtoken = jwt.decode(token);
    var user_id = decodedtoken.id;


   
       let user = await User.findById({_id: user_id});
       
       console.log(user.cart);
       let cartItems = user.cart.length;
    let book;
       
                 book = await Book.find({_id: { $in: user.cart}})
                console.log(book);
                res.locals.book = book;
                
            
      
   
    
    next();




};

//display items in cart
const viewBookmarked = async(req, res, next) => {
    
    const token = req.cookies.jwt;
    const decodedtoken = jwt.decode(token);
    var user_id = decodedtoken.id;


   
       let user = await User.findById({_id: user_id});
       
       console.log(user.bookmarked);
       let cartItems = user.bookmarked.length;
    let book;
       
                 book = await Book.find({_id: { $in: user.bookmarked}})
                console.log(book);
                res.locals.book = book;
                
            
      
   
    
    next();




};


module.exports = { requireAuth, checkUser, viewProduct , viewCart , viewBookmarked};