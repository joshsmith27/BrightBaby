module.exports = {
    AddToCart: (product, quanity) => {
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let isDuplicate = false;
        for(var i = 0; i < currentCartItems.length; i++){
            if(currentCartItems[i].productid === product.productid){
                isDuplicate = true;
                break;
            }
        }
        if(!isDuplicate){
            product.quanity = quanity;
            currentCartItems.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(currentCartItems));
        
    },
    
    RemoveItemFromCart: (productId)=>{
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let newCartItem = currentCartItems.filter((item)=>{
            return item.productid !== productId
        })
        localStorage.setItem('cart', JSON.stringify(newCartItem));
    },

    ClearCartItems: () => {
        localStorage.setItem('cart', JSON.stringify([]));
    },

    UpdateCartItem: (productId, quanity) =>{
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let updatedCartItem = currentCartItems.map((item)=>{
            if(item.productid === productId){
                item.quanity = quanity;
                return item 
            }else{
                return item
            }
        })
        localStorage.setItem('cart', JSON.stringify(updatedCartItem));
    },
    GetTotal: ()=>{
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        return currentCartItems.reduce((a, b) => {
            return a + (Number(b.price)* b.quanity);
          }, 0);
    }
}