import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Reducer } from "react";

interface CartType {
    id: string;
    productId:number;
    brand: string;
    name: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}

interface Icart{
    cart : CartType[] | any,
}
const initialState : Icart = {
    cart : [],
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart : (state, action) => {
            if(state.cart.find((item : any) => item.id === action.payload.id && item.size === action.payload.size)){
                state.cart.find((item : any) => item.id === action.payload.id).quantity += 1
            }else{
                state.cart.push(action.payload)
            }
        },
        decreaseQuantity : (state, action) => {
            state.cart.find((item : any) => item.id === action.payload.id).quantity -= 1
            if(state.cart.find((item : any) => item.id === action.payload.id).quantity === 0){
                state.cart = state.cart.filter((item : any) => item.id !== action.payload.id)
            }
        },
        removeFromCart : (state, action) => {
            state.cart = state.cart.filter((item : any) => item.id !== action.payload.id)
        },
        clearCart : (state) => {
            state.cart = []
        }
    },
});
export const cartList = (state : any) => state.cart.cart;
//export const { reducer: cartReducer, actions: cartActions } = cartSlice;
export const addToCart = cartSlice.actions.addToCart;
export const decreaseQuantity = cartSlice.actions.decreaseQuantity;
export const removeFromCart = cartSlice.actions.removeFromCart;
export const clearCart = cartSlice.actions.clearCart;
export default cartSlice.reducer;
