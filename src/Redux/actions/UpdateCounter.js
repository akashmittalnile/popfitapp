// export const ADD_TO_CART="ADD_TO_CART";
 
// export const addToCart = cartItems => ({
//     type:ADD_TO_CART,
//     payload: cartItems,
//   });
 export function CartCounter(payload){
    return { 
        type:"cartcounter",
        payload: payload 
    }
}
export function incrementCounter(payload) {
    return {
        type: "notificatoncount",
        payload: payload
    }
}




 