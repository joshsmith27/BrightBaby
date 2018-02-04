const {dbGetter} = require('../services/db')

module.exports = {
	getProducts: ( req, res, next ) => {
		const dbInstance = dbGetter(req);
		dbInstance.get_planes()
			.then(planes => { res.status(200).send(planes); })
			.catch( err => {
				console.log(err);
				res.status(500).send(err);
			});
	},
}