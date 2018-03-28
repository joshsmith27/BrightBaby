UPDATE ProductImages 
SET imagepath = $3,
is_default = $4
WHERE productid = $1 and imageid = $2;