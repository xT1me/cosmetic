import { combineReducers, createStore } from "redux";
import { userReducer } from "./user/userReducer";
import { cartReducer } from "./cart/cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

const store = createStore(rootReducer)

export default store
