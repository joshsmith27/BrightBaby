module.exports = {
    AddToCart: (products, quanity) => {
        debugger
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        products.quanity = quanity;
        currentCartItems.push(products);
        localStorage.setItem('cart', JSON.stringify(currentCartItems));
        
    },
    RemoveItemFromCart: (productId)=>{
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let newCartItem = currentCartItems.filter((item)=>{
            return item.productId !== productId
        })
        localStorage.setItem('cart', JSON.stringify(newCartItem));
    },
    ClearCartItems: () => {
        localStorage.setItem('cart', JSON.stringify([]));
    },
    UpdateCart: (productId, quanity) =>{
        let currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let updatedCartItem = currentCartItems.map((item)=>{
            if(item.productId === productId){
                item.quanity = quanity;
                return item 
            }else{
                return item
            }
        })
        localStorage.setItem('cart', JSON.stringify(updatedCartItem));
    }
}