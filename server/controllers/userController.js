const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const sendMail = require('./sendlerEmail')


const userController = {
    getMyAccount: async (require, result) => {
        try {
            const userId = request.user;

            const user = await User.findOne({
                where: { id: userId },
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            return response.status(200).json(user);
        } catch (error) {handleErrors(error, result)}
    },
    getAllUsers: async (request, response) => {
        try {
            const page = parseInt(request.query.page) || 1;
            const users = await User.findAndCountAll({
                limit: 4,
                offset: (page - 1) * 4,
                attributes: { exclude: ['password'] },
                order: [['id', 'ASC']]
            });
            response.status(200).json(users);
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getUserById: async (require, result) => {
        try {
            const user = await User.findOne({
                where: {id: require.params.user_id},
                attributes: {exclude: ['password']}
            })
            if(!user) return result.status(400).json({message: "User with this id not found"})
            return result.status(200).json(user)
        } catch (error) {handleErrors(error, result)}
    },
    createNewUser: async (require, result) => {
        try{
            const {login, email, password, full_name} = require.body
            const passwordHash = await bcrypt.hash(password, 24)
            const user = await User.create({
                login: login,
                email: email,
                password: passwordHash,
                full_name: full_name
            })
            sendMail(email)
            if(!user) return result.status(400).json({message: "User not created"})
            return result.status(201).json({message: "User created"})
        } catch (error) {handleErrors(error, result)}
    },
    changeAvatar: async (require, result) => {
        try{
            if(require.file) {
                const user = await User.findOne({
                    where: {id: require.user.id}
                })
                if (!user) return result.status(404).json({message: "User not found"})
                console.log(require.file.filename)
                await user.update({
                    photo: `http://localhost:3001/${require.file.filename}`
                })
                return result.status(200).json({message: "Avatar updated"})
            } else return result.status(400).json({message: "File is not image"})
        } catch (error) {handleErrors(error, result)}
    },
    updateUser: async (require, result) => {
        try {
            const {full_name, password, role} = require.body
            console.log(role)
            let passwordHash
            if(password.length > 0) passwordHash = await bcrypt.hash(password, 24)
            const user = await User.findOne({where: {id: require.params.user_id}})
            if(!user) return result.status(400).json({message: "User not found"})
            await user.update({
                            full_name: full_name ? full_name : user.full_name,
                            password: passwordHash ? passwordHash : user.password,
                            role: role ? role : user.role
                        },
                {where: {id: user.id}}
            )
            return result.status(200).json({message: "User data updated"})
        } catch (error) {handleErrors(error, result)}
    },
    deleteUser: async (require, result) => {
        try {
            const user = await User.findOne({where: {id: require.params.user_id}})
            if(!user) return result.status(400).json({message: "User not found"})
            await user.destroy()
            return result.status(200).json({message: "User deleted"})
        } catch (error) {handleErrors(error, result)}
    }
}
function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}
module.exports = userController
