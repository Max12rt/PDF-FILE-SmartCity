const router = require('express').Router();
const userCtrl = require('../controllers/userController');
const authenticateUser = require('../main/authenteficate');
const authenticateAdmin = require('../main/authenteficateAdmin');
const upload = require('../main/fileLoader');

router.get('/myAccount', authenticateUser, userCtrl.getMyAccount);
router.get('/', userCtrl.getAllUsers);
router.get('/:userId', authenticateUser, userCtrl.getUserById);
router.post('/', authenticateUser, authenticateAdmin, userCtrl.createNewUser);
router.post('/avatar', upload.single('avatar'), authenticateUser, userCtrl.changeAvatar);
router.patch('/:userId', authenticateUser, userCtrl.updateUser);
router.delete('/:userId', authenticateUser, authenticateAdmin, userCtrl.deleteUser);

module.exports = router;
