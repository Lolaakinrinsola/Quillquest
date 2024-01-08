const express = require('express');
const cors =require('cors')
const { updatePassword, protect } = require('../Controller/authController');

const { signup, login, updateMe, deleteMe, getMe, getUser, uploadUserPhoto, resizeUserPhoto } = require("../Controller/userController")

const userRouter=express.Router()
userRouter.use(cors())
userRouter.post('/signup', uploadUserPhoto,resizeUserPhoto,signup)
userRouter.post('/login', login)

userRouter.use(protect)
userRouter.patch('/updateMyPassword', updatePassword)
userRouter.patch('/updateMe', updateMe)
userRouter.delete('/deleteMe', deleteMe)
userRouter.get('/me',getMe,getUser)

module.exports =userRouter