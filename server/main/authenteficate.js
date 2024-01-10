const jwt = require('jsonwebtoken')

const authenteficate = (require, result, next) => {
    try {
        if(!require.header("Authorization"))
            return result.status(400).json({message: "Invalid authentication."})
        jwt.verify(require.header("Authorization"), process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if(error) return result.status(400).json({message: "Invalid authentication."})
            require.user = user
            next()
        })
    } catch (error) {return result.status(500).json({message: error.message})}
}
module.exports = authenteficate
