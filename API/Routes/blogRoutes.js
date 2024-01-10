const express = require('express');
const cors =require('cors')
const { updatePassword, protect } = require('../Controller/authController');
const { createBlog, setBlogUser, blogById, uploadBlogPhoto, resizeBlogPhoto, getAllBlogs, deleteBlog, editBlog } = require('../Controller/blogController');

const blogRouter=express.Router()
const corsOptions = {
    origin: '*', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  };
blogRouter.use(cors(corsOptions))

// blogRouter.route('/').post(protect,uploadBlogPhoto,resizeBlogPhoto,createBlog).get(protect,getAllBlogs)
blogRouter.route('/').post(protect,setBlogUser,uploadBlogPhoto,resizeBlogPhoto,createBlog).get(getAllBlogs)

blogRouter.route('/:id').get(blogById).delete(protect,deleteBlog).patch(protect,editBlog)

module.exports=blogRouter
