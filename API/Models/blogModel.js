const mongoose = require('mongoose')
// const User = require('./userModel')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please input the title!']
    },
    photo:{type:String, default:'default.jpg'},
    summary:{
        type:String,
        required:[true,'Please input the summary!']
    },
    content:{
        type:String,
        required:[true,'Please input the description!']
    },
    contentChangedAt:{
      type:Date,
      default:Date.now
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User', // reference to the User model
        required:[ true, 'User must be signed in'],
      },
    // users:String
}
,{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }
  )


  // blogSchema.virtual('users',{
  //   ref:'User',
  //   localField:'users',
  //   foreignField:'email',
  // })
  blogSchema.pre(/^find/,function(next){
    this.populate({
      path:'user',
      select:'name email',
      options: { strictPopulate: false },
    })
    next()
  })

const Blog=mongoose.model('Blog',blogSchema)

module.exports= Blog