import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import Loader from '../loader/Loader'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Search from '../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_PRODUCTS, selectFilterProduct } from '../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteproduct, getProduct } from '../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ProductList = ({products,isLoading}) => {
  const [search,setSearch]=useState('')
   const dispatch=useDispatch()
   const filteredProducts=useSelector(selectFilterProduct)

    const stortenText=(text,n)=>{
       if(text.length > n){
        const stortened=text.substring(0,n).concat('...')
        return stortened;
       }
       return text
    }

   //Delete product
    const delProduct=async (id)=>{
      await dispatch(deleteproduct(id))
      await dispatch(getProduct())
    }

    //confirm Delete Product
  
    const ConfirmDeleteProduct=(id)=>{

      confirmAlert({
        title: 'Delete a Product',
        message: 'Are you sure Delete this product',
        buttons: [
          {
            label: 'Delete',
            onClick: () => delProduct(id)
          },
          {
            label: 'Cancel',
            //onClick: () => alert('Click No')
          }
        ]
      });
    }


    //Begin Pagination

  const [itemOffset, setItemOffset] = useState(0);


  const itemsPerPage = 7;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems =filteredProducts.length === 0 ? [] : filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  
  const handlePageClick = (event) => { 
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }

    //End Pagination

    useEffect(()=>{
      dispatch(FILTER_PRODUCTS({products,search}))
    },[products,search,dispatch])

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
          <div className='--flex-between --flex-dir-column'>
            <span>
               <h3>Inventory Items</h3>
            </span>
            <span>
              <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </span>
          </div>
          {isLoading && <Loader/>}

          <div className='table'>
             {!isLoading && products.length === 0 ? (
                <p>
                    Product not Found, Please Add Product!
                </p>
             ) : (
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          currentItems.map((product,index)=>{
                              const {_id,name,price,category,quantity} =  product
                                return (
                                  <tr key={_id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {stortenText(name,16)}
                                    </td>
                                    <td>
                                       {category}
                                    </td>
                                    <td>
                                        {'$'} {price}
                                    </td>
                                    <td>
                                        {quantity}
                                    </td>
                                    <td>
                                        {'$'} {price * quantity}
                                    </td>
                                    <td className='icons'>
                                      <span>
                                        {<Link to={`/product-detail/${_id}`}> <AiOutlineEye size={25} color={'purple'}/> </Link>}
                                      </span>
                                      <span>
                                        {<Link to={`/edit-product/${_id}`}> <FaEdit size={25} color={'green'}/> </Link>}
                                      </span>
                                      <span>
                                        {<FaTrashAlt size={25} color={'red'} onClick={()=>ConfirmDeleteProduct(_id)}/>}
                                      </span>
                                    </td>
                                  </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

             )}
          </div>
          <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='activePage'
      />
      </div>
    </div>
  )
}

export default ProductList
