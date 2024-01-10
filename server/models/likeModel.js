const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const Like = sequelize.define( "Like",{
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
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ["like", "dislike"],
        allowNull: true
    }
})

Like.sync()

module.exports = Like
