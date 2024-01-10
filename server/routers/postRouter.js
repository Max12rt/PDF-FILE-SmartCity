const router = require('express').Router()
const postCtrl = require('../controllers/postController')
const auth = require('../main/authenteficate')

router.get('/', postCtrl.getAllPosts)
router.get('/my', postCtrl.getMyPosts)
router.get('/:post_id', postCtrl.getPostById)
router.get('/:post_id/comments', postCtrl.getCommentsByPostId)
router.post('/:post_id/comments',  postCtrl.createCommentToPostById) //auth
router.get('/:post_id/categories', postCtrl.getCategoriesByPostId)
router.get('/:post_id/like',  postCtrl.getAllLikesByPostId)  // auth
router.post('/', postCtrl.createPost)
router.post('/:post_id/like', postCtrl.createNewLikeByPostId)  
router.put('/:post_id', postCtrl.updatePostById) //router.put('/:post_id', auth, postCtrl.updatePostById)
router.delete('/:post_id', postCtrl.deletePostById)
router.delete('/:post_id/like', auth, postCtrl.deleteLikeByPostId)

module.exports = router
