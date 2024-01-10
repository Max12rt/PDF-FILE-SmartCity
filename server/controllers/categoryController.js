const Category = require('../models/categoryModel')
const Post = require('../models/postModel')
const Post_Category = require('../models/postCategModel')

const categoryController = {
    getAllCategoriesWithPagination: async (request, res) => {
        try {
            const page = parseInt(request.query.page) || 1; // Ensure page is a number
            const limit = 4;
            const offset = (page - 1) * limit;

            await Category.findAndCountAll({
            }).then(result => {
                return res.status(200).json(result)
            })
        }
         catch (error) {handleErrors(error, result);}
    },
    getAllCategories: async (request, res) => {
        try {
            await Category.findAll().then(result => {
                return res.status(200).json(result)
              })
        } catch (error){handleErrors(error, result);}
    },
    getCategoryById: async (request, result) => {
        try {
            console.log(request.params)
            const category = await Category.findOne({
                where: {id: request.params.categoryId}
            })
            if(!category)
                return result.status(400).json({message: "Category with this id does not exist"})
            return result.status(200).json(category)
        } catch (error) {handleErrors(error, result);}
    },
    getPostsByCategoryId: async (require, result) => {
        try {
            const posts = await Post.findAndCountAll({
              limit: 4,
              offset: (require.query.page - 1) * 4,
                include: [{
                    model: Category,
                    where: {id: require.params.category_id},
                    as: "categories"
                }]
            })
            if(!posts) return result.status(404).json({message: "Category with this id does not exist"})
            return result.status(200).json(posts)
        }  catch (error) {handleErrors(error, result);}
    },
    createNewCategory: async (require, result) => {
        try {
            const { title, description } = require.body
             const category = await Category.findOne({
                where: {title: title}
            })
            if(category)
                return result.status(400).json({message: "This category already exist"})
            await Category.create({
                title: title,
                description: description
            })
            return result.status(200).json({message: "Category created"})
        } catch (error) {
            handleErrors(error, result);
        }
    },
    updateCategoryById: async (require, result) => {
        try {
            const { title, description } = require.body
            const category = await Category.findOne({
                where: {id: require.params.categoryId}
            })
            if(!category) return result.status(400).json({message: "Category with this id does not exist"})
            await category.update({
                title: title,
                description: description ? description : category.description
            })
            return result.status(200).json({message: "Category updated"})
        } catch (error) {handleErrors(error, result);}
    },
    deleteCategoryById: async (require, result) => {
        try {
            await Category.destroy({where: {id: require.params.categoryId}})
            return result.status(200).json({message: "Category deleted"})
        } catch (error) { handleErrors(error, result);}
    }
}
function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}

module.exports = categoryController
