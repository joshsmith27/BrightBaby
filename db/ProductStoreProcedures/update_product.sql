UPDATE product 
SET name = $2, price = $3, description = $4, MoreInformation = $5, avaliablequantity = $6, ishomeproduct =$7
WHERE productId = $1;