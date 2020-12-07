const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    };

    //incorrect email
    if(err.message == 'incorrect email'){
        errors.email = 'incorrect email or password';
    }

    //incorrect password
    if(err.message == 'incorrect password'){
        errors.password = 'incorrect email or password';
    }

    // duplicate error code
    if(err.code === 11000) {
        errors.email = "email is already registered";
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; // 3 days to seconds

const createToken = (id) => {
    return jwt.sign({id}, 'egg-book-secret', {
        expiresIn: maxAge
    })
}

const signup_get = (req,res) => {
    res.render('signup', {title: 'Sign up'});
}

const login_get = (req,res) => {
    res.render('login', {title: 'Log in'});
}

const signup_post = async (req,res) => {
    const {email, password, first_name, last_name} = req.body;
    
    try {
        const user = await User.create({email, password, first_name, last_name});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

const login_post = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).send({errors});
    }
}

const logout_get = async (req,res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}

const index_get = async (req,res) => {
    res.render('index', {title:'Home'});
}   

const bookmarks_get = async (req,res) => {
    res.render('bookmarks', {title:'Bookmarks'});
}

const owned_get = async (req,res) => {
    res.render('owned', {title:'Owned'});
}

const forgotpass_get = async (req,res) => {
    res.render('forgotpass', {title: 'Forgot Password'});
}
const forgotpass_post = async(req, res) => {
    const { email } = req.body;

    User.exists({ email: email }, function(err, doc) {
        if (doc) {
            res.redirect('/forgotpasscode')
        } else {
            res.redirect(400, '/forgotpass')
                
        }

    });

}

const forgotpasscode_get = async (req,res) => {
    res.render('forgotpasscode', {title: 'Forgot Password'});
}

const enterpassword_get = async (req,res) => {
    res.render('enterpassword', {title: 'Enter Password'});
}
module.exports = {
    signup_get, 
    signup_post,
    login_get,
    login_post,
    logout_get,
    index_get,
    bookmarks_get,
    owned_get,
    forgotpass_get,
    forgotpass_post,
    forgotpasscode_get,
    enterpassword_get
}
