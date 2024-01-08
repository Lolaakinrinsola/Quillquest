const express =require('express')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize= require('express-mongo-sanitize')
const xss= require('xss-clean')
const hpp= require('hpp')
const cookieParser= require('cookie-parser')
const app= express()
const path =require('path')
const fs = require('fs');
const userRouter = require('./Routes/userRoutes');
const blogRouter = require('./Routes/blogRoutes');
const cors = require('cors');
// app.get('/',(req,res)=>{
//     res.json('test ok')
// })
const limiter = rateLimit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message:'Too many requests from this IP, please try again in an hour'
})
app.use('/app',limiter)
app.use(cors({
  origin: '*',
}));
app.use(helmet())

app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true,limit:'10kb'}));
// app.use(express.static(`public`));
app.use(cookieParser())

//data sanitization against nosql operation
app.use(mongoSanitize())

app.use(xss())

// app.listen(4000)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
  
    // Always send JSON response
    res.status(err.statusCode || 500).json({
      success: false,
      status:"failed",
      message: err.message || 'Internal Server Error',
    });
  });

module.exports = app;