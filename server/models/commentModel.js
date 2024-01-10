const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')
const Like = require('./likeModel')


const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Comment.sync()

Comment.hasMany(Like, {
    foreignKey: "comment_id",
    onDelete: "cascade"
})

module.exports = Comment
