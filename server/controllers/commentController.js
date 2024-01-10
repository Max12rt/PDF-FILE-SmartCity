const Comment = require('../models/commentModel')
const Like = require('../models/likeModel')

const commentController = {
    getCommentById: async (require, result) => {
        try {
            const comment = await Comment.findOne({
                where: {id: require.params.comment_id}
            })
            if(!comment) return result.status(404).json({message: "Comment with this id not found"})
            return result.status(200).json(comment)
        } catch (error) {handleErrors(error, result);}
    },
    getAllLikesByCommentId: async (require, result) => {
        try {
            const likes = await Comment.findAll({
                where: {id: require.params.comment_id},
                include: [{
                    model: Like,
                    where: {comment_id: require.params.comment_id}
                }]
            })
            if(!likes) return result.status(404).json({message: "No Likes under this comment"})
            return result.status(200).json(likes)
        } catch (error) {handleErrors(error, result);}
    },
    createNewLikeByCommentId: async (require, result) => {
        try {
            const { likeType } = require.body
            const comment = await Comment.findOne({
                where: {id: require.params.comment_id}
            })
            if(!comment) return result.status(404).json({message: "Comment with this id does not exist"})
            const like = await Like.findOne({
                where: {author: require.user.id, comment_id: require.params.comment_id}
            })
            if (!like) {
                await Like.create({
                    author: require.user.id,
                    publishDate: new Date(),
                    comment_id: require.params.comment_id,
                    type: likeType
                })
                return result.status(200).json({message: "Like created"})
            } else return result.status(400).json({message: "You already liked this comment"})
        } catch (error) {handleErrors(error, result);}
    },
    updateCommentById: async (require, result) => {
        try {
            const { content } = require.body
            const comment = await Comment.findOne({
                where: {id: require.params.comment_id}
            })
            if(!comment) return result.status(404).json({message: "Comment with this id does not exist"})
            if (comment.author === require.user.id) {
                await comment.update({
                    content: content,
                    publishDate: new Date(),
                })
                return result.status(200).json({message: "Comment updated"})
            } else return result.status(400).json({message: "You are not author of this comment"})
        } catch (error) {handleErrors(error, result);}
    },
    deleteCommentById: async (require, result) => {
        try {
            const comment = await Comment.findOne({
                where: {id: require.params.comment_id}
            })
            if(!comment) return result.status(404).json({message: "Comment with this id does not exist"})
            if(comment.author === require.user.id || require.user.role === "admin") {
                comment.destroy()
                return result.status(200).json({message: "Comment deleted"})
            } else return result.status(400).json({message: "Only author or admin can delete comment"})
        } catch (error) {handleErrors(error, result);}
    },
    deleteLikeByCommentId: async (require, result) => {
        try {
            const comment = await Comment.findOne({
                where: {id: require.params.comment_id}
            })
            if(!comment) return result.status(404).json({message: "Comment with this id does not exist"})
            const like = await Like.findOne({
                where: {comment_id: comment.id, author: require.user.id}
            })
            if(!like) return result.status(404).json({message: "No like under this comment"})
            await like.destroy()
            return result.status(200).json({message: "Like deleted"})
        } catch (error) {handleErrors(error, result);}
    }
}
function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}
module.exports = commentController
