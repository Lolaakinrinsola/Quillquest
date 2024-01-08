const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.deleteOne = Model => catchAsync(async function (req, res,next) {
    const doc= await Model.findByIdAndDelete(req.params.id);
  
    if(!doc) return next(new AppError('No document found with that ID',404))
    res.status(204).json({
      status: 'successful',
      data: null,
    });
    
  });

exports.updateOne =Model=> catchAsync(async function (req, res,next) {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if(!doc) return next(new AppError('No document found with that ID',404))
  
    res.status(200).json({
      status: 'successful',
      data: {
        data:doc
      },
    });
    
  })

  exports.createOne =Model=> catchAsync(async(req,res,next)=>{
    console.log(req.body,'got to see what')
    const doc =await Model.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            data:doc
        }
    })
  })

  exports.getOne=(Model,popOptions)=>catchAsync(async function (req, res,next) {
    userId=req.params.id
    let query=Model.findOne({_id:userId})
    console.log(popOptions,'the popOptions')
    if(popOptions) query=query.populate(popOptions)
    console.log(query,'the query of the whole thing')
    const doc = await query.exec();
  
    if(!doc) return next(new AppError('No document found with that ID',404))
  
    res.status(200).json({
      status: 'successful',
      data: {
        data:doc,
      },
    });
    
  })

  exports.getAll= Model=>catchAsync(async function (req, res,next) {
    
    //to allow 
    let filter={}
    if(req.params.tourId) filter={tour:req.params.tourId}

    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().pagination();
    const doc = await features.query;
    res.status(200).json({
      status: 'successful',
      result: doc.length,
      data: {
        data:doc,
      },
    });
  });