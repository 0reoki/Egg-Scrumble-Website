const { Router } = require('express');
const controller = require('../controllers/controllers');
const search_controller = require('../controllers/searchcontroller');
const router = Router();

router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);
router.get('/login', controller.login_get);
router.post('/login', controller.login_post);
router.get('/logout', controller.logout_get);
router.get('/', controller.index_get);
router.get('/admin', controller.admin_get);
router.get('/bookmarks', controller.bookmarks_get);
router.get('/owned', controller.owned_get);
router.get('/forgotpass', controller.forgotpass_get);
router.post('/forgotpass', controller.forgotpass_post);
router.get('/forgotpasscode', controller.forgotpasscode_get);
router.post('/forgotpasscode', controller.forgotpasscode_post);
router.get('/enterpassword', controller.enterpassword_get);
router.post('/enterpassword', controller.enterpassword_post);
router.get('/cart', controller.cart_get);
router.post('/cart', controller.cart_post);
router.get('/book', controller.book_get);
router.post('/search', search_controller.search_post);
router.post('/viewbooks', search_controller.viewbooks_post);

module.exports = router;