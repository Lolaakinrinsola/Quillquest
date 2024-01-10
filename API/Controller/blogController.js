
const Blog = require('../Models/blogModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage()


exports.setBlogUser = (req, res, next) => {
    // Ensure that the user is logged in (user details are stored in req.user)
    console.log(req.user,'the user on this stuff',req.body)
    if (!req.user) {
      return next(new AppError('You must be logged in to create a blog.', 401));
    }
  
    // Set the user field in req.body with the ObjectId of the logged-in user
    req.body.user = req.user._id;
  
    next();
  };
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


exports.uploadBlogPhoto=upload.single('photo')
exports.resizeBlogPhoto=catchAsync(async (req,res,next)=>{
    if(!req.file) return next();

    req.file.filename = `blog-${Date.now()}.jpeg`
   
    const processedImage = await sharp(req.file.buffer)
    .resize(1000, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

    await sharp(processedImage).toFile(`Public/images/blog/${req.file.filename}`);
    next()
}
)

exports.createBlog = catchAsync(async (req, res, next) => {
    const newBlog = await Blog.create({
      title: req.body.title,
      summary: req.body.summary,
      content:req.body.content,
      photo: req.file ? req.file.filename : 'default.jpg',
      user:req.body.user
    });
    res.status(201).json({
        status:'success',
        data:newBlog
    })
    // createSendToken(newUser,201,res)
  });
// exports.createBlog = factory.createOne(Blog);

exports.blogById= factory.getOne(Blog, 'user')

exports.getAllBlogs=factory.getAll(Blog)

exports.deleteBlog=factory.deleteOne(Blog)

exports.editBlog =factory.updateOne(Blog)