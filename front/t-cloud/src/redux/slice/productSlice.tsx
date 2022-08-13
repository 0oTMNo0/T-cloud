import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Reducer } from "react";


export const fetchProducts :any = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetch("http://localhost:8000/store/product");
        const data = await response.json();
        return data;
    }
);
export const fetchCategories :any = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const response = await fetch("http://localhost:8000/store/category");
        const data = await response.json();
        return data;
    }
);


interface ProductType {
    product:[],
    ProductStatus: "idle" | "pending" | "fulfilled" | "rejected",
    category:[],
    CategoryStatus: "idle" | "pending" | "fulfilled" | "rejected",
}
const initialState : ProductType = {
    product: [],
    ProductStatus: "idle",
    category: [],
    CategoryStatus: "idle",
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.ProductStatus = "pending";
        }
        )
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.product = action.payload;
            state.ProductStatus = "fulfilled";
        }
        )
        .addCase(fetchProducts.rejected, (state, action) => {
            state.ProductStatus = "rejected";
        }
        )
        .addCase(fetchCategories.pending, (state, action) => {
            state.CategoryStatus = "pending";
        }
        )
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.category = action.payload;
            state.CategoryStatus = "fulfilled";
        }
        )
        .addCase(fetchCategories.rejected, (state, action) => {
            state.CategoryStatus = "rejected";
        }
        )
    }
});
export const { reducer: productReducer } = productSlice;
export default productSlice.reducer;