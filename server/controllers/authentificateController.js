const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());


const sendMail = require('./sendlerEmail')

const authentificateController = {
    register: async (request, result) => {
        try {
            const {login, email, password, full_name} = request.body
            console.log('Password:', password);
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {login, email, password: passwordHash, full_name}
            const activation_token = createActivationToken(newUser);

            if(!login || !email || !password)
                return result.status(400).json({message: "Please fill in all fields."})
            if(!validateEmail(email))
                return result.status(400).json({message: "Invalid email."})

            let user = await User.findOne({where: {email: email}})

            if(user) return result.status(400).json({message: "This email already exist."})
            else {
                user = await User.findOne({where: {login: login}})
                if(user) return result.status(400).json({message: "This login already exist."})
            }
            if(password.length < 8) return result.status(400).json({message: "Password must be at list 8 characters."})

            const mailOptions = {
                to: request.body.email,
                subject: 'Confirm email',
                text: `http://localhost:3001/activation/${activation_token}`
            }
            sendMail(mailOptions)
            result.status(200).json({message: "Register Success! Please activate your email."})
        } catch (error) {
            handleErrors(error, result);
        }
    },
    activateEmail: async (request, result) =>{
      try {
          const {activation_token} = request.body
          const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
          const {login, email, password, full_name} = user
          let check = await User.findOne({where: {email: email}})
          if(check) return result.status(400).json({message: "This email already exist."})
          else {
              check = await User.findOne({where: {login: login}})
              if(check) return result.status(400).json({message: "This login already exist."})
          }
          await User.create({
              login: login,
              email: email,
              password: password,
              full_name: full_name
          })
          result.status(200).json({ message: "Account has been activated."});
      } catch (error) {
          handleErrors(error, result);
      }
    },
    login: async (request, result) => {
        try {
            const {email, password} = request.body
            const user = await User.findOne({where: {email: email}})
            if(!user) return result.status(400).json({message: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return result.status(400).json({message: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user.id, role: user.role})
            

            console.log(refresh_token)
            result.cookie('userId', user.id, { httpOnly: true });
            //console.log(result)

            result.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/auth/refresh_token',
                maxAge: 23485000
            })
            result.json({message: "Login successful."})
        } catch (error) {
            handleErrors(error, result);
        }
    },
    getAccessToken: (request, result) => {
        try {
            const rf_token = request.cookies.refreshtoken
            if(!rf_token) return result.status(400).json({message: 'Please login'})
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return result.status(400).json({message: "Please login"})
                const access_token = createAccessToken({id: user.id, role: user.role})
                result.json({access_token})
            })
        } catch (error) {
            handleErrors(error, result);
        }
    },
    forgotPassword: async (request, result) => {
        try {
            const {email} = request.body
            const user = await User.findOne({where: {email: email}})
            if(!user) return result.status(400).json({message: "This email does not exist."})
            const access_token = createAccessToken({id: user.id, role: user.role})
            const mailOptions = {
                to: request.body.email,
                subject: 'Reset password',
                text: `http://localhost:3001/resetPassword/${access_token}`
            }
            sendMail(mailOptions)
            result.status(200).json({message: "Re-send the password, please check your email."})
        } catch (error) {
            handleErrors(error, result);
        }
    },
    resetPassword: async (request, res) => {
        try {
            const token = request.params.confirmToken;
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decodedToken) => {
                if (error) {
                    console.error(error);
                    return res.status(400).json({ message: "Invalid authentication." });
                }

                const { password } = request.body;
                if (password.length < 8) {
                    return res.status(400).json({ message: "Password must be at least 8 characters." });
                }

                const userId = decodedToken.id;
                const updatedUser = await User.findOne({ where: { id: userId } });

                if (updatedUser) {
                    const passwordHash = await bcrypt.hash(password, 12);
                    await updatedUser.update({ password: passwordHash });

                    res.status(200).json({ message: "Password changed successfully" });
                } else {
                    res.status(400).json({ message: "User not found." });
                }
            });
        } catch (error) {
            handleErrors(error, res);
        }
    },


    logout: async (request, result) => {
        try {
            result.clearCookie('refreshtoken', {path: '/api/auth/refresh_token'})
            return result.status(200).json({message: "Logged out"})
        } catch (error) {
            handleErrors(error, result);
        }
    }
}

function validateEmail(email) {
    const check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return check.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}

module.exports = authentificateController
