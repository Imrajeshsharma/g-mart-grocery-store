import {configureStore} from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import ordersReducer from "../features/orders/ordersSlice";


export const store= configureStore({
    reducer:{
        cart: cartReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
        search: searchReducer,
        orders: ordersReducer,
    },
});