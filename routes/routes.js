const { Router } = require('express');
const controller = require('../controllers/controllers');
const router = Router();

router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);
router.get('/login', controller.login_get );
router.post('/login', controller.login_post);
router.get('/logout', controller.logout_get);
router.get('/', controller.index_get);
router.get('/bookmarks', controller.bookmarks_get);
router.get('/owned', controller.owned_get);
router.get('/forgotpass', controller.forgotpass_get);
router.get('/forgotpasscode', controller.forgotpasscode_get);
router.get('/enterpassword', controller.enterpassword_get);

module.exports = router;