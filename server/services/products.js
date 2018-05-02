const {dbGetter} = require('../services/db')

module.exports= {
    getProducts:(num, req) => {
        return new Promise((resolve, reject)=>{
            let data;
            const dbInstance = dbGetter(req);
            dbInstance.ProductStoreProcedures.get_products([num])
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
                        resolve(data) ;
                    })
                })
                .catch( err => {
                    console.log(err);
                   reject(err);
                }); 
        });           
    },
    checkForDefault(images){
        const hasDefault = images.reduce((bool, image)=>{
            if(image.isDefault){
                bool = true;
            }
            return bool;
        }, false)
        if(hasDefault){
            return images;
        }else{
            images[0].isdefault = true;
            return images;
        }
    },
    changeDefaultFunc(feArr, dbArr){
        let rtn = [];
        const feArrIds = feArr.map((image)=>{
            return image.imageid;
        })
        dbArr = dbArr.map((image)=>{
            image.isdefault  = image.is_default;
            return image;
        })
        dbArr.forEach((el)=>{
            if(!feArrIds.includes(el.imageid)){
                el.isdefault = false;
                rtn.push(el);
            }
        })
        return [...rtn, ...feArr];
    }
}