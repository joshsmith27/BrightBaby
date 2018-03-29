select productImages.imageId, productImages.productid, productImages.imagepath, productImages.is_default
from productimages join product on productimages.productid = product.productid
where product.productid = $1