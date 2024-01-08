const crypto =require('crypto')
const mongoose = require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name!']
    },
    address:{
        type:String,
        required:[true,'Please provide your address!']
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail]
    },
    photo:{type:String, default:'default.jpg'},
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8,
        select:false
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    // blog: { 
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Blog"
    //  }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  })
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bcrypt.hash(this.password, 12)

    // this.passwordConfirm=undefined;

    next()
})

userSchema.pre('save',function(next){
    if(!this.isModified('password')|| this.isNew) return next();

    this.passwordChangedAt= Date.now() - 1000;
    next();
})

userSchema.pre(/^find/,function(next){
//this points to the current query
this.find({active:{$ne:false}})
next()
})

userSchema.methods.correctPassword=async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp= parseInt(this.passwordChangedAt.getTime()/1000, 10)

        return JWTTimestamp < changedTimestamp
    }

    return false
}

userSchema.methods.createPasswordResetToken= function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')

    console.log({resetToken},this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}
userSchema.pre('save', function (next) {
    if (!this.photo && this.isNew && !this.isModified('photo')) {
      this.photo = 'default.jpg';
    }
    next();
  });

//   userSchema.pre(/^find/,function(next){
//     this.populate({
//       path:'blog',
//       select:'title '
//     })
//     next()
//   })

userSchema.virtual('blogs',{
    ref:'Blog',
    foreignField:'user',
    localField:'_id',
  })
const User=mongoose.model('User',userSchema)

module.exports=User