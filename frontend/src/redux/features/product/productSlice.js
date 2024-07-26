import {createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "./productServices";
import { toast } from "react-toastify";


const initialState={
    product:[],
    products:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    totalStoreValue:0,
    outOfStock:0,
    category:[]
}

//Cretate a New Product

export const createProduct=createAsyncThunk(
    'products/create',
    async (formData,thunkApi)=>{
        try {
            return await productServices.createProduct(formData)
        } catch (error) {
            const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            console.log(message)
            return thunkApi.rejectWithValue(message)
        }
    }
 )

 export const getProduct=createAsyncThunk(
    'products/getAll',
     async (_,thunkApi)=>{

        try {
          return  await productServices.getProdusts()
        } catch (error) {
            
            const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            console.log(message)
            thunkApi.rejectWithValue(message)
        }

     }
 )

 //delete product

 export const deleteproduct=createAsyncThunk(
    'products/delete',
    async (id,thunkApi)=>{
        try {
            
        return await productServices.deleteProduct(id)
        
        } catch (error) { 
            const message=(error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString();
                console.log(message)
                thunkApi.rejectWithValue(message)
        }
    }
 )

 //get single product this function is get single product i initiallize it getProducts
 export const getproducts=createAsyncThunk(
    'products/getProduct',
    async (id,thunkApi)=>{
        try {
            
        return await productServices.getProduct(id)
        
        } catch (error) { 
            const message=(error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString();
                console.log(message)
                thunkApi.rejectWithValue(message)
        }
    }
 )

 //update product

 export const updateProduct=createAsyncThunk(
    'products/update',
    async ({id,formData},thunkApi)=>{

     try {
        return await productServices.updateProduct(id,formData)
     } catch (error) {
        
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            console.log(message)

        thunkApi.rejectWithValue(message)
     }

    }
 )



 //product Slice

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        cal_store_value(state,action){
           const product=action.payload;
           const array=[]
        if(Array.isArray(product)) {
            product.map((item)=>{
            const {price,quantity}=item
            const storevalue=price * quantity;
            return array.push(storevalue)
            })
        }else {
            console.log("product is not an array")
        }
          const totalValue=array.reduce((a,b)=>{ return a+b },0)
          state.totalStoreValue=totalValue
          
        },
        cal_outOfStack(state,action){
        const products=action.payload;
        const array=[]
        if(Array.isArray(products)) {
          products.map((item)=>{
            const {quantity}=item
           return  array.push(quantity)
          
          })}else{
            console.log("product is not an array")
          }
          let count = 0;
          array.forEach((number)=>{
            if(number === 0 || number === '0'){
              count++;
            }
          });  

          state.outOfStock=count;
        },
        cal_category(state,action){
           const  products= action.payload;
           const array=[]
         if(Array.isArray(products)) {
            products.map((item)=>{
            const {category}=item;
            return array.push(category)
           })
        }else{
            console.log('Products is not array')
        }
           const uniqueCatogory=[...new Set(array)]
           state.category=uniqueCatogory;
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
                toast.success('Product Added Successfully')
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true
                state.message=action.payload
                toast.error(action.payload)
            })

            .addCase(getProduct.pending,(state)=>{state.isLoading = true})
            .addCase(getProduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.products=action.payload;
                state.isError=false;
                state.isSuccess=true;
            })
            .addCase(getProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message=action.payload
                toast.error(action.payload)
            })
            .addCase(deleteproduct.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(deleteproduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true
                toast.success('Product Deleted Successfully')
            })
            .addCase(deleteproduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message=action.payload;
                toast.error(action.payload);
            })
            .addCase(updateProduct.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true
                toast.success('Product Updated Successfully')
            })
            .addCase(updateProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message=action.payload;
                toast.error(action.payload);
            })
            .addCase(getproducts.pending,(state)=>{state.isLoading = true})
            .addCase(getproducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.product=action.payload;
                state.isError=false;
                state.isSuccess=true;
            })
            .addCase(getproducts.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message=action.payload
                toast.error(action.payload)
            })
    }
})

export const selectIsLoading=(state)=>state.product.isLoading;

export const selectTotalvalue=(state)=>state.product.totalStoreValue;
export const selectProduct=(state)=>state.product.product;

export const {cal_store_value,cal_outOfStack,cal_category}=productSlice.actions;

export const  selectOutOfStack=(state)=>state.product.outOfStock;
export const selectCatogory=(state)=>state.product.category;

export default productSlice.reducer;

