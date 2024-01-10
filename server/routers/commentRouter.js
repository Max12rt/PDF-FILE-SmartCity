const router = require('express').Router();
const commentCtrl = require('../controllers/commentController');
const authenticateUser = require('../main/authenteficate');

router.get('/:comment_id', authenticateUser, commentCtrl.getCommentById);
router.get('/:comment_id/like', authenticateUser, commentCtrl.getAllLikesByCommentId);
router.post('/:comment_id/like',  commentCtrl.createNewLikeByCommentId); //authenticateUser
router.patch('/:comment_id', authenticateUser, commentCtrl.updateCommentById);
router.delete('/:comment_id', authenticateUser, commentCtrl.deleteCommentById);
router.delete('/:comment_id/like', authenticateUser, commentCtrl.deleteLikeByCommentId);

module.exports = router;
