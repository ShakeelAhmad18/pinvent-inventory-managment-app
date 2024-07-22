import Card from '../card/Card'
import './ProductForm.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React from 'react'

const ProductForm = ({product,imagePreview,productImage,saveProduct,generateSKU,description,setDiscription,handleImageChange,handleInputChange}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card'"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className='--color-dark'>Supported Format:jpg,jpeg,png</code>
            <input type="file" name='image' onChange={(e)=>handleImageChange(e)} />

            {imagePreview !== null ? (
              <div className="image-preview">
              <img src={imagePreview} alt="product" />
            </div>)
             : (<p>No Image Set for this product</p>)}
          </Card>
         <label >Product Name:</label>
         <input type="text" name="product" value={product?.name} onChange={handleInputChange} />

         <label>Product Catagory</label>
         <input type="text" name='catagory' value={product?.catagory} onChange={handleInputChange} />

         <label>Product Quantity</label>
         <input type="text" name='quantity' value={product?.qauantity} onChange={handleInputChange}/>

         <label>Product Description</label>
         <ReactQuill theme='snow' value={description} onChange={setDiscription} modules={ProductForm.modules} formats={ProductForm.formats}/>
        </form>
      </Card>

      <div className='--my'>
        <button className='-bth --btn-primary'>Save Product</button>
      </div>
    </div>
  )
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];


export default ProductForm
