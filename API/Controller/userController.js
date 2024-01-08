const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const crypto=require('crypto')
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const multer = require('multer')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage()

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else {
        cb(new AppError('Not an image! Please upload only images.',400),false)
    }
}



const upload =multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


exports.uploadUserPhoto=upload.single('photo')

exports.resizeUserPhoto=catchAsync(async (req,res,next)=>{
    if(!req.file) return next();

    req.file.filename = `user-${req.body.name}-${Date.now()}.jpeg`
   
    const processedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

    await sharp(processedImage).toFile(`Public/images/users/${req.file.filename}`);
    next()
}
)

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  const createSendToken=(user, statusCode,res)=>{
    const token = signToken(user._id);
    const cookieOptions={
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    if(process.env.NODE_ENV==='production') cookieOptions.secure = true

    user.password = undefined
    
    res.cookie('jwt',token,cookieOptions)
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      address:req.body.address,
      password: req.body.password,
      passwordChangedAt:req.body.passwordChangedAt,
      photo: req.file ? req.file.filename : 'default.jpg'
    });
  
    createSendToken(newUser,201,res)
  });

  exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    //check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    //check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 400));
    }
    //if everything ok, send token to client
  
    createSendToken(user,201,res)
  
  //   const token = signToken(user._id);
  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //   });
  });

  exports.updateMe=catchAsync(async(req,res,next)=>{
    console.log(req.file)
    console.log(req.body)
    //create error if user posts password data
    if(req.body.password){
        return next(new AppError('this route is not for password updates. Please use /updateMyPassword',400))
    }
    //update user document
    const filteredBody = filterObj(req.body,'name','email')
    if (req.file) filteredBody.photo = req.file.filename
    const updatedUser =await User.findByIdAndUpdate(req.user.id,filteredBody,{new:true, runValidators:true})

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    })
})

exports.deleteMe=catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,
        {active:false})

    res.status(204).json({
        status:'success',
        data:null
    })
})

exports.getMe=(req,res,next)=>{
    req.params.id=req.user.id
    next()
}
exports.getUser=factory.getOne(User)
