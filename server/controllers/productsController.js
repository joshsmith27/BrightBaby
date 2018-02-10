const {dbGetter} = require('../services/db')

module.exports = {
	getProducts: ( req, res, next ) => {
		const dbInstance = dbGetter(req);
		let data;
        if (!req.user){
            dbInstance.ProductStoreProcedures.get_products(['1'])
			.then(products => { data = products; return products})
			.then(products=>{
				const images = products.map((product)=>{
					return dbInstance.ProductStoreProcedures.get_product_images(product.productid)
				})	
				Promise.all(images)
					.then((images)=>{
						for(var i = 0; i < data.length; i++){
							data[i].productImages = images[i];
						}
					res.json(data)
				})
			})
	
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
        }else{
            dbInstance.get_products([1])
			.then(products => { res.status(200).send(products); })
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
        }
    },

    getDetails: ( req, res, next ) => {
        const dbInstance = dbGetter(req);
            dbInstance.get_detail([req.params.ProductsId])
			.then(details => { res.status(200).send(details)})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
    },

    postProduct: ( req, res, next ) => {
		console.log(req.body)
        let {Name, Price, Description, MoreInformation, Quanity, ProductImage} = req.body;
		let data = [Name, Price, Description, MoreInformation, Quanity];
		const dbInstance = dbGetter(req);
		if(req.params.id < 1){
            dbInstance.ProductStoreProcedures.create_product(data)
			.then(product => { 
				return dbInstance.ProductStoreProcedures.get_newest_product()})
			.then(product => {
				dbInstance.ProductStoreProcedures.add_image([product[0].productid, ProductImage])})
			.then(product => {
				return dbInstance.ProductStoreProcedures.get_products(['1'])})
			.then(products => {res.json(products)})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
		}else{
            dbInstance.ProductStoreProcedures.update_product(data)
			.then(product => { dbInstance.get_products(['1'])})
			.then(products => {res.json(products)})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
		}
    },
}