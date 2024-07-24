import { createSlice } from "@reduxjs/toolkit"


const initialState={
    filterProduct:[],
}


const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        FILTER_PRODUCTS(state,action){
            const {products,search}=action.payload;
        
            const tempProduct=
             products.filter((product)=>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase()) 
            )
            state.filterProduct=tempProduct;
        },
    
    },
})


export const {FILTER_PRODUCTS} = filterSlice.actions;

export const selectFilterProduct=(state)=>state.filter.filterProduct;

export default filterSlice.reducer;