let mongoose = require("mongoose");
let Products = mongoose.model("Products")


class ProductController{
	
	all(req,res){
		Products.find({}, (err,prods)=>{
			if(err){
				return res.json({messages:err});
			}
			else{
				return res.json(prods);
			}
		});
	}



	create(req,res){
		console.log(req);
		
		Products.findOne({name:req.body.name}, (err,prods)=>{
			if(prods){
				return res.json({errors: "This product name already exist, please type different name"});
			}
			else{
				let prods = new Products(req.body);

				prods.save((err)=>{
					if(err){
						return res.json({errors: "Product name must be 3 letters or more"});
					}
					else{
						return res.json(prods);
					}
				});
			}
		});
	}


	update(req,res){
		Products.findOne({_id:req.params.id},(err,prods)=>{

			if(prods){
				prods.name = req.body.name || prods.name;
				prods.qty = req.body.qty || prods.qty;
				prods.price = req.body.price || prods.price;
				
				prods.save((err)=>{
					if(err){
						return res.json({errors:err});
					}else{
						return res.json(prods);
					}
				});
			}else{
				return res.json({errors:"Failed to find listing!"});
			}
		});
	}



	show(req,res){
		Products.findOne({_id:req.params.id}, (err,prods)=>{
			if(err){
				return res.json({errors: err});
			}
			else{
				return res.json(prods);
			}
		});
	}


	
	destroy(req,res){
		Products.findOne({_id:req.params.id}, (err, prods)=>{
			if(prods){
				if(prods.qty>1){
					prods.qty -= 1;
					prods.save((err)=>{
						if(err){
							console.log(err)
						}
						else{
							return res.json(prods)
						}
					});
				}
				else{
					Products.remove({_id:req.params.id},(err, prods)=>{
						if(err){
							console.log(err)
						}
						else{
							return res.json("this item is no longer exist")
						}
					});
				}
			}
			else{
				return res.json({errors: "couldn't remove"})
			}
		});
	}


}


module.exports = new ProductController();
