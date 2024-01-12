const { promisify } = require('util');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const crypto=require('crypto')

exports.protect = catchAsync(async (req, res, next) => {
    //getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt){
      token=req.cookies.jwt
    }
    if (!token) {
      return next(new AppError("you're not logged in! ", 401));
    }
    //validate token
    const decorded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user still exists
  
    const freshUser = await User.findById(decorded.id);
    if(!freshUser){
      return next(new AppError('the user no longer exists',401))
    }
    //check if user changed password after token was issued
    if (freshUser.changedPasswordAfter(decorded.iat)){
      return next(new AppError('User recently changed password! Please log in again', 401))
    }
  //grant access to protected route
    req.user=freshUser
    res.locals.user= freshUser
    next();
  });

  exports.isLoggedIn = async (req, res, next) => {
    //getting token and check if it's there
    try {
      if(req.cookies.jwt){
        token=req.cookies.jwt
      //validate token
      const decorded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      //check if user still exists
    
      const freshUser = await User.findById(decorded.id);
      if(!freshUser){
        return next()
      }
      //check if user changed password after token was issued
      if (freshUser.changedPasswordAfter(decorded.iat)){
        return next()
      }
    //there is a logged in user
    res.locals.user=freshUser
      return next();
    }
    } catch (error) {
      return next()
    }
   
  next();
  
  };

  exports.updatePassword =catchAsync(async (req,res,next)=>{
    //get user from collection
    const user = await User.findById(req.user.id).select('+password')
    //check if posted current password is correct
    if(!await(user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your current password is wrong',401))
    }
    //if so, update password
    user.password = req.body.password;
    // user.passwordConfirm= req.body.passwordConfirm
    await user.save()
    //log user in, send JWT

  createSendToken(user,200,res)

})