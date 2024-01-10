const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')
const Comment = require('./commentModel')
const Like = require('./likeModel')

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
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
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "cascade"
})

Post.hasMany(Like, {
    foreignKey: "post_id",
    onDelete: "cascade"
})
Post.sync()

module.exports = Post
