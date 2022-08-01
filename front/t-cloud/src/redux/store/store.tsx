import { configureStore } from "@reduxjs/toolkit"
import productSlice from "../slice/productSlice";
import cartSlice from "../slice/cartSlice";


export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;