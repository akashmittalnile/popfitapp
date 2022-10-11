import ADD_TO_CART from "../actions/UpdateCounter"
const initialState = 0
// const initialState = {
//     cartItems: [],
// };

const CartCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "cartcounter":
            console.log('124cart');
            state = action.payload
            return state
    // const { type, payload } = action;
    // switch (type) {
        // case CartActionType.SET_TO_CART: {
        //     return {
        //         ...state,
        //         cartItems: payload,
        //     }
        // }
        // case CartActionType.ADD_TO_CART: {
        //     const index = state.cartItems.findIndex(
        //         e => e.product_id === payload.product_id,
        //     );
        //     if (index > -1) {
        //         const newArray = [...state.cartItems];
        //         if (newArray[index].qty !== payload.qty) {
        //             newArray[index] = { ...newArray[index], qty: payload.qty };
        //             return {
        //                 ...state,
        //                 cartItems: newArray,
        //             };
        //         } else {
        //             return state;
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             cartItems: [...state.cartItems, payload],
        //         };
        //     }
        // }
        default:
            return state
    }
};

export default CartCounterReducer

