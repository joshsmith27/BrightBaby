UPDATE ProductImages 
SET imagepath = $3
WHERE productid = $1 and imageid = $2;