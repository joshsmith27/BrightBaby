const {dbGetter} = require('../services/db')
const {getProducts} = require('../services/products')
module.exports = {
	getProducts: ( req, res, next ) => {
        if (!req.user){
			getProducts('1', req)
				.then((data)=>{
					res.json(data);
				})
				.catch( err => {
                    console.log(err);
                   res.json(err);
                });
        }else{
			getProducts('0', req)
				.then((data)=>{
					res.json(data);
				})
				.catch( err => {
                    console.log(err);
                   res.json(err);
                });
        }
    },
    getDetails: ( req, res, next ) => {
		let data ={};
        const dbInstance = dbGetter(req);
            dbInstance.ProductStoreProcedures.get_details([req.params.id])
			.then(details => { 
				data.details = details[0]
				return dbInstance.ProductStoreProcedures.get_product_images(req.params.id)
			})
			.then((images)=>{
				data.details.productImages = images;
				res.json(data);
			})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
	},

	getImages:(req, res, next)=>{
		const dbInstance = dbGetter(req);
		dbInstance.ProductStoreProcedures.get_product_images(req.params.id)
			.then((images)=>{
				res.json(images);
			})
			.catch((err)=>{
				console.log(err);
				res.status(500).send(err);
			})
	},

    postProduct: ( req, res, next ) => {
        let {Name, Price, Description, MoreInformation, Quanity, ProductImages, IsHomeProduct} = req.body;
		let data = [Name, Price, Description, MoreInformation, Quanity, IsHomeProduct];
		const dbInstance = dbGetter(req);
		if(req.params.id < 1){
			dbInstance.ProductStoreProcedures.create_product(data)
			//Todo use massive helper functions. 
			.then(product => { 
				return dbInstance.ProductStoreProcedures.get_newest_product()})
			.then(product => {
				ProductImages.map((image)=>{
					dbInstance.ProductStoreProcedures.add_image([product[0].productid, image.imagepath, image.isdefault])})
				})
			.then(product => {
				return getProducts('0', req)
				})
			.then((data)=>{
				res.json(data);
			})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
		}else{
			let {Name, Price, Description, MoreInformation, Quanity, ProductImages, IsHomeProduct} = req.body;
			let data = [req.params.id, Name, Price, Description, MoreInformation, Quanity, IsHomeProduct];
			let productInfo ={}
            dbInstance.ProductStoreProcedures.update_product(data)
			.then(product => { 
				return dbInstance.ProductStoreProcedures.get_details(req.params.id)})	
			.then(product => { 
				productInfo.productid = product[0].productid
				return dbInstance.ProductStoreProcedures.get_product_images(req.params.id)
			})
			.then((images)=>{
				if(ProductImages.length > 0){
					var change = ProductImages.reduce((bool, image)=>{
						if(image.isdefault){
							return bool = true;
						}
					}, false)
					let imageIds = images.map((image)=>{
						if()
						return image.imageid
					})
					ProductImages.forEach((image)=>{
						if(imageIds.includes(image.imageid)){
							dbInstance.ProductStoreProcedures.update_image([image.productid, image.imageid, image.imagepath, image.isdefault])
						}else if(images.length < 3){
							dbInstance.productimages.insert({productid: productInfo.productid, imagepath: image.imagepath, is_default:image.isdefault})
						}
					})
				}
				
			})
			
			.then(product => {
				return getProducts('0', req)
				})
			.then((data)=>{
				res.json(data);
			})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
		}
	},

	deleteProduct:( req, res, next )=>{
		//Todo use massive helper function
		const dbInstance = dbGetter(req);
		dbInstance.product.destroy({productid:req.params.id})
		.then(product => {
			return getProducts('0', req)
			})
		.then((data)=>{
			res.json(data);
		})
		.catch( err => {
			console.log(err);
			res.status(500).send(err);
		});
	},
	
	uploadImages: (req, res)=>{
		let data = req.files.map((file) =>{
		  return file.filename
		})
		res.send(data)
	  },

	  getHomeProducts:(req, res)=>{
		const dbInstance = dbGetter(req);
		/// Gets home page products
		dbInstance.product.find({ishomeproduct: true})
			.then((homeProducts)=>{
				/// Gets images for the products.
				const images = homeProducts.map((product)=>{
					return dbInstance.productimages.find({productid:product.productid})
				})
				Promise.all(images)
				.then((images)=>{
					// Maps through homeproducts and assigns the 
					// corresponding image array to the home product. 
					const data = homeProducts.map((product)=>{
						product.images = images.filter((image)=>{
							if(image[0].productid == product.productid){
								return image
							}
						})[0];
						return product;
					})
					res.send(data);
				})
			})
	  }
}