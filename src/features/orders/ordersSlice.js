import { createSlice } from "@reduxjs/toolkit";

const loadOrders = () => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
};

const initialState = {
    orders: loadOrders(),
};

const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);

            localStorage.setItem(
                "orders",
                JSON.stringify(state.orders)
            );
        },

        clearOrders: (state) => {
            state.orders = [];
            localStorage.removeItem("orders");
        },
    },
});

export const {
    addOrder,
    clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;