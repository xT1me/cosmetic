import { SET_CART_ITEMS } from "./actionTypes";

export class cartActions {
    constructor(dispatch) {
        this.dispatch = dispatch
    }

    addItem = (cartItems, item) => {
        const existingItem = cartItems.find((i) => i.id === item.id);
        if (existingItem) {
            this.dispatch({
                type: SET_CART_ITEMS,
                payload: cartItems.map((i) =>
                    i.id === item.id ? { ...i, count: i.count + item.count } : i
                )
            });
        }

        this.dispatch({
            type: SET_CART_ITEMS,
            payload: [...cartItems, item]
        });

    };

    removeItem = (cartItems, cartItem) => {
        this.dispatch({
            type: SET_CART_ITEMS,
            payload: cartItems.filter((item, i) => item.id !== cartItem.id)
        })
    };

    clearCart = () => {
        this.dispatch({
            type: SET_CART_ITEMS,
            payload: []
        })
    }
}


