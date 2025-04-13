import React, { useState } from "react";
import "../../styles/pages/ProductPage.scss";
import Cart from "../../components/Cart";

const ProductPage = () => {
  const [visible, setVisible] = useState(false);
  const price = {
    original: 25.89,
    discounted: 20.25,
  };

  return (
    <div className='product-page'>
      <div className='product-container'>
        <div className='product-image'>
          <img
            src='https://htmldemo.net/urdan/urdan/assets/images/product/product-2.png'
            alt='New Modern Chair'
          />
        </div>

        <div className='product-info'>
          <h1 className='product-title'>New Modern Chair</h1>

          <div className='product-price'>
            <span className='original-price'>${price.original}</span>
            <span className='discounted-price'>${price.discounted}</span>
          </div>

          <div className='product-controls'>
            <div className='quantity-control'>
              <button className='quantity-btn'>-</button>
              <input
                type='number'
                value='1'
                min='1'
                className='quantity-input'
              />
              <button className='quantity-btn'>+</button>
            </div>
            <Cart visible={visible} onVisibleChange={(e) => setVisible(e)} />
            <button
              className='add-to-cart-btn'
              onClick={() => setVisible(true)}
            >
              Add to cart
            </button>
          </div>

          <div className='product-details'>
            <div className='detail-item'>
              <span className='detail-label'>SKU:</span>
              <span className='detail-value'>Ch-256xl</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Category:</span>
              <span className='detail-value'>Office, Home</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Tags:</span>
              <span className='detail-value'>Furniture</span>
            </div>
            <div className='detail-item' style={{ flexDirection: "column" }}>
              <span className='detail-label'>Description:</span>
              <span className='detail-value'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
