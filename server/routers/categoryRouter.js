const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryController');
const authenticateUser = require('../main/authenteficate');
const authenticateAdmin = require('../main/authenteficateAdmin');

router.get('/', categoryCtrl.getAllCategoriesWithPagination);
router.get('/all', authenticateUser, categoryCtrl.getAllCategories);
router.get('/:categoryId', categoryCtrl.getCategoryById); //router.get('/:categoryId', authenticateUser, categoryCtrl.getCategoryById);
router.get('/:categoryId/posts', authenticateUser, categoryCtrl.getPostsByCategoryId);
router.post('/', categoryCtrl.createNewCategory); //authenticateUser
router.put('/:categoryId', categoryCtrl.updateCategoryById);
router.delete('/:categoryId',  categoryCtrl.deleteCategoryById); //authenticateUser, authenticateAdmin,

module.exports = router;
