import React, { useEffect } from 'react';
import './ProductDetails.scss';
import useRedirectLogoutUser from '../../customHook/useRedirectLogoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectLoggedIn } from '../../redux/features/auth/authSlice';
import { getproducts } from '../../redux/features/product/productSlice';
import Card from '../card/Card';
import Loader from '../loader/Loader';
import DOMPurify from 'dompurify';

const ProductDetails = () => {
  useRedirectLogoutUser('/login');

  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getproducts(id));
    }

    if (isError) {
      console.error('Error fetching product:', message);
    }
  }, [dispatch, message, isError, isLoggedIn, id]);

  const stackStatus = (quantity) => {
    return quantity > 0 ? <span className="--color-success">In Stock</span> : <span className="--color-danger">Out of Stock</span>;
  };

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <Loader />}
        {!isLoading && product && (
          <div className="detail">
            <Card cardClass="group">
              {product.image ? (
                <img src={product.image.filePath} alt={product.image.fileName} />
              ) : (
                <p>There is no image for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stackStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name:</span> &nbsp;{product.name}
            </h4>
            <p>
              <b>&rarr; SKU:</b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category:</b> {product.category}
            </p>
            <p>
              <b>&rarr; Price:</b> ${product.price}
            </p>
            <p>
              <b>&rarr; Quantity in Stock:</b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in Stock:</b> ${product.quantity * product.price}
            </p>
            <hr />
            <p><b>&rarr; Description:</b></p>
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }} />
            <hr />
            <code className="--color-dark">Created At: {new Date(product.createdAt).toLocaleString()}</code><br />
            <code className="--color-dark">Last Updated At: {new Date(product.updatedAt).toLocaleString()}</code>
          </div>
        )}
        {!isLoading && !product && <p>No product details found.</p>}
        {isError && <p className="error">{message}</p>}
      </Card>
    </div>
  );
};

export default ProductDetails;
