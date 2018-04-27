let ProductController = require("../controllers/ProductController.js");
let path = require("path")

module.exports = (app)=>{
	app.get("/api/all", ProductController.all);
	app.post("/api/new", ProductController.create);
	app.put("/api/edit/:id", ProductController.update);
	app.get("/api/show/:id", ProductController.show);
	app.delete("/api/delete/:id", ProductController.destroy);
	app.all("*",(req,res)=>{
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}