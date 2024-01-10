const User = require('../models/userModel');

const authorizeAdmin = async (require, result, next) => {
    try {
        const user = await User.findOne({ where: { id: require.user.id } });
        if (!user) return result.status(404).json({ message: "User not found" });
        if (user.role !== 'admin') return result.status(403).json({ message: "Unauthorized: Admin rights required" });
        next();
    } catch (error) {return result.status(500).json({ message: error.message });}
};

module.exports = authorizeAdmin;
