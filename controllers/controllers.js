const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
//const { encrypt, decrypt} = require('../middleware/crypto');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    };

    //incorrect email
    if (err.message == 'incorrect email') {
        errors.email = 'incorrect email or password';
    }

    //incorrect password
    if (err.message == 'incorrect password') {
        errors.password = 'incorrect email or password';
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; // 3 days to seconds

const createToken = (id) => {
    return jwt.sign({ id }, 'egg-book-secret', {
        expiresIn: maxAge
    })
}

const signup_get = (req, res) => {
    res.render('signup', { title: 'Sign up' });
}

const login_get = (req, res) => {
    res.render('login', { title: 'Log in' });
}

const signup_post = async(req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const user_type = "Standard User";

    try {
        const user = await User.create({ email, password, first_name, last_name, user_type });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

const login_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, user_type: user.user_type });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

const logout_get = async(req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

const index_get = async(req, res) => {
    res.render('index', { title: 'Home' });
}

const admin_get = async(req, res) => {
    res.render('adminindex', { title: 'Admin Home' });
}

const bookmarks_get = async(req, res) => {
    res.render('bookmarks', { title: 'Bookmarks' });
}

const owned_get = async(req, res) => {
    res.render('owned', { title: 'Owned' });
}

const forgotpass_get = async(req, res) => {
    res.render('forgotpass', { title: 'Forgot Password' });
}

const forgotpass_post = async(req, res) => {
    const { email } = req.body;
    //check if the email entered exists
    //const hash = encrypt(email);
    //console.log(hash);
    User.exists({ email: email }, function(err, doc) {

        if (doc) {
            //Private info of the emailer
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'eggbookemailer@gmail.com',
                    pass: 'Emailer123!'
                }

            });
            // generates 4 digit code and save the generated code to db
            let code = Math.floor(1000 + Math.random() * 9000);
            User.findOneAndUpdate({ email: email }, { $set: { code: `${code}` } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            });

            //the message + code to be sent to the users email
            let mailOptions = {
                from: 'eggbookemailer@gmail.com_noreply',
                to: `${email}`,
                subject: 'Password Reset Request',
                text: "Your Verification code is " + `${code}`

            };
            //the sending process of the email
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Email not sent: ' + error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
            //redirects to the enter passcode



            res.render('forgotpasscode', { email: email, title: "Enter Code" })

        } else {

            res.redirect(400, '/forgotpass')

        }

    });


}

const forgotpasscode_get = async(req, res) => {
    res.render('forgotpasscode', { title: 'Forgot Password' });
}

const forgotpasscode_post = async(req, res) => {
    const { email, code } = req.body;
    //console.log(req);
    //   const hash = encrypt(email);
    //gets code in the db     
    User.findOne({ email: email }, (err, doc) => {
        if (err) {
            console.log("Error");
        }
        //compare the code entered by the user and in the db

        if (doc.code == code) {


            res.redirect(200, '/forgotpasscode' + '?nigma');
        } else
            res.redirect(400, '/forgotpasscode');
        //
    });




}



const enterpassword_get = async(req, res) => {
    res.render('enterpassword', { title: 'Enter Password' });
}

const enterpassword_post = async(req, res) => {
    const { email, code, newpass } = req.body;


    //gets code in the db     
    User.findOne({ email: email }, (err, doc) => {
        if (err) {
            console.log("Error");
        }
        //compare the code entered by the user and in the db

        if (doc.code == code) {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(newpass, saltRounds);

            bcrypt.hash(newpass, saltRounds, function(err, hash) {
                // Store hash in your password DB.
            });
            console.log(hash);
            User.findOneAndUpdate({ email: email }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            });
            res.redirect(200, '/login');
            //change password

        } else
            res.redirect(400, '/forgotpasscode');
        //
    });
}

const cart_get = async(req, res) => {
    res.render('cart', { title: 'Cart' });
}

const cart_post = async(req, res) => {
    const { bookId } = req.body;
    const token = req.cookies.jwt;
   // const { user } = req.locals;

   if (token==null)
   {
       console.log("Welcome Guest")
   }

   if (token!=null)
   {
   const decodedtoken = jwt.decode(token);
   var user_id = decodedtoken.id;
   // console.log(user_id + bookId);
                
    User.findByIdAndUpdate(user_id, { $addToSet: { cart : bookId } }, 
                            function (err, docs) { 
    if (err){
        res.send(400); 
        console.log(err) 
    } 
    else{ 
        res.send(200);
        console.log(docs); 
       
    }
    });
    
   
}
  
}

const bookmarks_post = async(req, res) => {
    const { bookId } = req.body;
    const token = req.cookies.jwt;
   // const { user } = req.locals;

   if (token==null)
   {
       console.log("Welcome Guest")
   }

   if (token!=null)
   {
   const decodedtoken = jwt.decode(token);
   var user_id = decodedtoken.id;
   // console.log(user_id + bookId);
                
    User.findByIdAndUpdate(user_id, { $addToSet: { bookmarked : bookId } }, 
                            function (err, docs) { 
    if (err){
        res.send(400); 
        console.log(err) 
    } 
    else{ 
        res.send(200);
        console.log(docs); 
       
    }
    });
    
   
}
  
}
const book_get = async(req, res) => {
    res.render('book', { title: 'Book' });
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get,
    index_get,
    admin_get,
    bookmarks_get,
    owned_get,
    forgotpass_get,
    forgotpass_post,
    forgotpasscode_get,
    forgotpasscode_post,
    enterpassword_get,
    enterpassword_post,
    cart_get,
    book_get,
    cart_post,
    bookmarks_post
}