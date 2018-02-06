const {dbGetter} = require('../services/db')

module.exports = {
	getProducts: ( req, res, next ) => {
        const dbInstance = dbGetter(req);
        if (req.user.id){
            dbInstance.get_products([0])
			.then(products => { res.status(200).send(products); })
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
    getProducts: ( req, res, next ) => {
        const dbInstance = dbGetter(req);
        if (req.user.id){
            dbInstance.get_products([0])
			.then(products => { res.status(200).send(products); })
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
}