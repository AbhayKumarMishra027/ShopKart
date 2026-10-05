import { createSlice } from "@reduxjs/toolkit"

const wishlist = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addWishlist: (state, action) => {
            state.push(action.payload)
        },
        setWishlist: (state, action) => {
            return action.payload;
        },
        removeWishlist: (state, action) => {
            return state.filter(product => product._id !== action.payload);
        }
    }
});

export const { addWishlist, setWishlist, removeWishlist } = wishlist.actions;
export default wishlist.reducer;

