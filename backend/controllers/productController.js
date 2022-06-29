const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");


// create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});
//get all product
exports.getAllProducts = catchAsyncError(async(req,res) =>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    });
});

//get Product Details

exports.getProductDetails = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product
    });
});

//update Project --Admin

exports.updateProduct = catchAsyncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if(!Product){
        return next(new ErrorHander("Product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        usefindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    });
});


//delete Product
exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted Sucessfully"
    })
});