UPDATE product 
SET name = $2, price = $3, description = $4, MoreInformation = $5, avaliablequantity = $6
WHERE productId = $1;