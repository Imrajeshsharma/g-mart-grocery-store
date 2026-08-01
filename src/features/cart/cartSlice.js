import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existing) {
                { existing.quantity += 1; }
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },

        increaseQty: (state, action) => {
            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (!item) return;

            if (item.quantity === 1) {
                state.items = state.items.filter(
                    i => i.id !== action.payload
                );
            } else {
                item.quantity--;
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;