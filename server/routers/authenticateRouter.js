const router = require('express').Router();
const authenticateCtrl = require('../controllers/authentificateController');

//router.get('/activation/:activation_token', authenticateCtrl.activateEmail);

router.post('/register', authenticateCtrl.register);
router.post('/activation', authenticateCtrl.activateEmail);
router.post('/login', authenticateCtrl.login);
router.post('/refresh_token', authenticateCtrl.getAccessToken);
router.post('/resetPassword', authenticateCtrl.forgotPassword);
router.post('/resetPassword/:confirmToken', authenticateCtrl.resetPassword);
router.post('/logout', authenticateCtrl.logout);

module.exports = router;
