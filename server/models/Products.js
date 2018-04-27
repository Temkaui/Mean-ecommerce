let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('Products',new mongoose.Schema({
	name:{type:String,required:true,minlength:3,maxlength:255},
	qty:{type: Number, required: true},
	price:{type: Number, required: true}
},{timestamps:true}));