select productImages.imageId, productImages.productid, productImages.imagepath from productimages 
join product on productimages.productid = product.productid
where product.productid = $1