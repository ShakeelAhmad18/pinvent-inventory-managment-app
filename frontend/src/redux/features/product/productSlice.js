import {createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "./productServices";
import { toast } from "react-toastify";



const initialState={
    product:null,
    products:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//Cretate a New Product

 const createProduct=createAsyncThunk(
    'product/create',
    async (formData,thunkApi)=>{
        try {
            return productServices.createProduct(formData)
        } catch (error) {
            const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            console.log(message)
            return thunkApi.rejectWithValue(message)
        }
    }
 )


 //product Slice

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        cal_store_value(state,action){
           console.log('Store Value')
        }
    },
    extraReducers:(builder)=>{
       builder
            .addCase(createProduct.pending,(state)=>{state.isLoading=true})
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                console.log(action.payload)
                state.products.push(action.payload);
                toast.success('Products Added Successfully')
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true
                state.message=action.payload
                toast.error(action.payload)
            })
    }
})


export const {cal_store_value}=productSlice.actions;

export default productSlice.reducer;

