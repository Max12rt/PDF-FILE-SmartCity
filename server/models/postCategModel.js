const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')
const Post = require('./postModel')
const Category = require('./categoryModel')

const PostCategory = sequelize.define("PostCategory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

PostCategory.sync()

Post.belongsToMany(Category, {
    through: PostCategory,
    as: "categories",
    foreignKey: "post_id",
    otherKey: "category_id"
})
Category.belongsToMany(Post, {
    through: PostCategory,
    as: "posts",
    foreignKey: "category_id",
    otherKey: "post_id"
})


module.exports = PostCategory
