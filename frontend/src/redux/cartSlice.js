import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
        addCart: (state, action) => {
            const existingItem = state.find(
                (item) => item.product._id === action.payload.product._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push(action.payload);
            }
        },
        updateCart: (state, action) => {
            const item = state.find(
                (item) => item.product._id === action.payload.productId
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeCart: (state, action) => {
            return state.filter(
                (item) => item.product._id !== action.payload
            );
        }
    }
});

export const {
    setCart,
    addCart,
    updateCart,
    removeCart
} = cart.actions;

export default cart.reducer;