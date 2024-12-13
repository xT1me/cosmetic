import { SET_CART_ITEMS } from "./actionTypes";

const defaultState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CART_ITEMS:
            const updatedCartItems = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return { ...state, cartItems: updatedCartItems };
        default:
            return state;
    }
};
