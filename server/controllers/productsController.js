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
        const dbInstance = dbGetter(req);
            dbInstance.get_detail([req.params.ProductsId])
			.then(details => { res.status(200).send(details)})
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
    },

    postProduct: ( req, res, next ) => {
        let {Name, Price, Description, MoreInformation, Quanity, ProductImages} = req.body;
		let data = [Name, Price, Description, MoreInformation, Quanity];
		const dbInstance = dbGetter(req);
		if(req.params.id < 1){
            dbInstance.ProductStoreProcedures.create_product(data)
			.then(product => { 
				return dbInstance.ProductStoreProcedures.get_newest_product()})
			.then(product => {
				ProductImages.map((image)=>{
					dbInstance.ProductStoreProcedures.add_image([product[0].productid, image.imagepath])})
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
			let {Name, Price, Description, MoreInformation, Quanity, ProductImages} = req.body;
			let data = [req.params.id, Name, Price, Description, MoreInformation, Quanity];
            dbInstance.ProductStoreProcedures.update_product(data)
			.then(product => { 
				return dbInstance.ProductStoreProcedures.get_details(req.params.id)})
			.then(product => {
				/// TODO add logic to add additional images
				ProductImages.map((image)=>{
					dbInstance.ProductStoreProcedures.update_image([req.params.id, image.imageid, image.imagepath])})
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
		const dbInstance = dbGetter(req);
		dbInstance.delete_product(req,params.productid)
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
}