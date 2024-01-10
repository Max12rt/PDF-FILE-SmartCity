const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const Category = require('../models/categoryModel')
const Like = require('../models/likeModel')
const User = require('../models/userModel')
const PostCategory = require('../models/postCategModel')
const jwt = require('jsonwebtoken');

const postController = {
    getAllPosts: async (request, res) => {
        try{
            const page = parseInt(request.query.page) || 1; // Ensure page is a number
            const limit = 4;
            const offset = (page - 1) * limit;

            await Post.findAndCountAll({                
            }).then(result => {
                res.status(200).json(result)
            })
           
        } catch (error) {handleErrors(error, result);}
    },
    getMyPosts: async (req, res) => {
        try{
            const userId = parseInt(req.cookies.userId);

                // Use the userId in your query
                Post.findAndCountAll({ where: { author: userId } })
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(error => {
                        handleErrors(error, res);
                    });
           
        } catch (error) {handleErrors(error, res);}
    },
    getPostById: async (require, result) => {
        try{
            const post = await Post.findOne({
                where: {id: require.params.post_id}               
            })
            if (!post) result.status(404).json({ message: "Post with this id does not exist" });
            else 
            {
                const comments = await Comment.findAll({
                where: {post_id: require.params.post_id}})

                result.status(200).json({ post, comments });
            }
        } catch (error) {handleErrors(error, result);}
    },
    getCommentsByPostId: async (require, result) => {
        try {
            const comments = await Post.findOne({
                where: { id: require.params.post_id },
                include: [{ model: Comment, where: { post_id: require.params.post_id } }]
            });
            if (!comments) result.status(404).json({ message: "Something wrong" });
            else result.status(200).json(comments);
        } catch (error) {handleErrors(error, result);}
    },
    createCommentToPostById: async (require, result) => {
        try {
            const userId = require.cookies.userId;
            
            const {content} = require.body
            const comment = await Comment.create({
                author: userId,
                publishDate: new Date(),
                content: content,
                post_id: require.params.post_id
            })
            if(!comment) return result.status(400).json({message: "Comment not created"})
            return result.status(200).json({message: "Comment created"})
        } catch (error) {handleErrors(error, result);}
    },
    getCategoriesByPostId: async (require, result) => {
        try {
            const categories = await Post.findAll({
                where: {id: require.params.post_id},
                include: [{
                    model: Category,
                    as: "categories"
                }]
            })
            if(!categories) return result.status(400).json("Something wrong")
            return result.status(200).json(categories)
        } catch (error) {handleErrors(error, result);}
    },
    getAllLikesByPostId: async (request, result) => {
        try {
            const userId = parseInt(request.cookies.userId);
            const likes = await Like.findAll({
                where: {post_id: request.params.post_id}                
            })
            if(!likes)
            {
                return result.status(200).json({countLike : 0, countDislike : 0,myChoose : ""})
            }
            const countLike = likes.filter(x=> x.type === "like").length
            const countDislike = likes.filter(x=> x.type === "dislike").length
            const likeDb =likes.find(x=> x.author === userId)
            if(likeDb === undefined)
            {
                return result.status(200).json({countLike, countDislike, myChoose: ""})
            }
            return result.status(200).json({countLike, countDislike, myChoose: likeDb.type})
        } catch (error) {handleErrors(error, result);}
    },
    createPost: async (request, result) => {
        try {
            const { title, content, categoriesSelect } = request.body
            const userId = parseInt(request.cookies.userId);
            console.log(userId)
            const post = await Post.create({
                title: title,
                content: content,
                author: userId,
                publishDate: new Date()
            })
           
            if(!post) return result.status(400).json({message: "Post not created"})
            console.log(post.id)
            categoriesSelect.map(async elem => {                
                await PostCategory.create({post_id: post.id, category_id : elem});
            })
            return result.status(200).json({message: "Post created"})


        } catch(error) {handleErrors(error, result);}
    },
    createNewLikeByPostId: async (require, result) => {
        try {
            const userId = parseInt(require.cookies.userId);
            
            const { likeType } = require.body
            const check = await Like.findOne({
                where: {author: userId, post_id: require.params.post_id}
            })
            if(check){
                if(check.type === 'dislike'){
                    if(likeType === 'dislike'){
                        return result.status(400).json({message: 'You can add only 1 like/dislike'})
                    } else if (likeType === 'like'){
                        const post = await Post.findOne({
                            where: {id: require.params.post_id}})
                        const user = await User.findOne({
                            where: {id: post.author}})
                        await post.update({rating: post.rating + 1})
                        await user.update({rating: user.rating + 1})
                        await check.destroy()
                        return result.status(200).json({message: 'Dislike deleted'})
                    }
                }
                else if(check.type === 'like'){
                    if(likeType === 'like'){
                        return result.status(400).json({message: 'You can add only 1 like/dislike'})
                    } else if (likeType === 'dislike'){
                        const post = await Post.findOne({
                            where: {id: require.params.post_id}})
                        const user = await User.findOne({
                            where: {id: post.author}})
                        await post.update({rating: post.rating - 1})
                        await user.update({rating: user.rating - 1})
                        await check.destroy()
                        return result.status(200).json({message: 'Like deleted'})
                    }
                }
            }
            const like = await Like.create({
                author: userId,
                publishDate: new Date(),
                post_id: require.params.post_id,
                type: likeType
            })
            if(!like) return result.status(400).json({message: "Like not created"})
            if(likeType === 'dislike') {
                const post = await Post.findOne({
                    where: {id: require.params.post_id}})
                const user = await User.findOne({
                    where: {id: post.author}})
                await post.update({rating: post.rating - 1})
                await user.update({rating: user.rating - 1})
                return result.status(200).json({message: "Dislike created"})
            }
            if(likeType === 'like') {
                const post = await Post.findOne({
                    where: {id: require.params.post_id}})
                const user = await User.findOne({
                    where: {id: post.author}})
                await post.update({rating: post.rating + 1})
                await user.update({rating: user.rating + 1})
                return result.status(200).json({message: "Like created"})
            }
        } catch (error) {handleErrors(error, result);}
    },
    updatePostById: async (require, result) => {
        
        const userId = parseInt( require.cookies.userId);
        console.log("1:"+userId+" -"+typeof(userId));
        const { title, content} = require.body
        const post = await Post.findOne({
            where: {id: require.params.post_id}})
        if(post.author === userId){
            await post.update({
                title: title ? title : post.title,
                content: content ? content : post.content,})
        }
        console.log("2:"+post.id+" a:"+post.author+" -"+typeof(post.author));
        if(post.author !== userId) return result.status(401).json({message: "Only the author can update the post"})
        if(!post) return result.status(400).json({message: "Post cant be update"})
        return result.status(200).json({message: "Post updated"})
    },
    deletePostById: async (require, result) => {
        const userId = parseInt(require.cookies.userId);
        
        try {
            const post = await Post.findOne({
                where: {id: require.params.post_id}})
            if(!post) return result.status(400).json({message: "Post with this id not found"})
            console.log("a:"+post.author+" g:"+typeof(post.author)+" w:"+ userId+" ty:"+typeof(userId))
            //todo user
            if(post.author === userId ){
                await Post.destroy({where: {id: require.params.post_id}})
                return result.status(200).json({message: "Post deleted"})
            } else
                return result.status(401).json({message: "Only the author can delete the post"})
        } catch (error) {handleErrors(error, result);}
    },
    deleteLikeByPostId: async (require, result) => {
        try {
            const post = await Post.findOne({
                where: { id: require.params.post_id }});
            if (!post) return result.status(400).json({ message: "Post with this id not found" });
            const like = await Like.findOne({
                where: { post_id: require.params.post_id, author: require.user.id }});
            if (!like) return result.status(400).json({ message: "You did not like this post" });
            if (like.type === 'dislike')
                await post.update({ rating: post.rating + 1 });
            else if (like.type === 'like')
                await post.update({ rating: post.rating - 1 });
            await like.destroy();
            return result.status(200).json({ message: "Like deleted" });
        } catch (error) {
            handleErrors(error, result);
        }
    }
}

function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}

module.exports = postController
