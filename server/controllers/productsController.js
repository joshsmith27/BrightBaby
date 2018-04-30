const {dbGetter} = require('../services/db')
const {getProducts, checkForDefault} = require('../services/products')

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
		let data = {name:Name, price:Price, description:Description, moreinformation:MoreInformation, avaliablequantity:Quanity, ishomeproduct:IsHomeProduct};
		const dbInstance = dbGetter(req);
		if(Number(req.params.id) <= 0){
			dbInstance.product.insert(data)
			.then(product => {
				ProductImages = checkForDefault(ProductImages);
				const images = ProductImages.map((image)=>{
					return dbInstance.productimages.insert({productid:product.productid, imagepath:image.imagepath, is_default:image.isdefault})
				})
				return Promise.all(images)
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
			let productInfo ={}
            dbInstance.product.update(data)
			.then(product => { 
				productInfo.productid = product.productid
				return dbInstance.productimages.find({productid:product.productid});
			})
			.then((images)=>{
				if(ProductImages.length > 0){
					var changeDefault = ProductImages.reduce((bool, image)=>{
						if(image.isdefault){
							bool = true;
							return bool; 
						}
						return bool;
					}, false)
					let imageIds = images.map((image)=>{
						if(changeDefault){
							image.is_default = false;
							ProductImages.push(image)
						}
						return image.imageid
					})
					if(changeDefault){
						ProductImages = ProductImages.filter((image, index, arr)=>{
							return arr.indexOf(index).imagesId !== image.imageId
						})
					}
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