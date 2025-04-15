import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/ProductPage.scss";
import Cart from "../../components/Cart";
import { useProduct, useAddToCart } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";

const ProductPage = () => {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: product, isLoading, error: productError } = useProduct(id);
  const addToCartMutation = useAddToCart();

  if (isLoading) return <div>Loading...</div>;
  if (productError) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setQuantity(1);
      return;
    }

    const newQuantity = Math.max(1, Math.min(100, numValue));
    setQuantity(newQuantity);
    setError(null);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (quantity < 1 || quantity > 100) {
        setError("Quantity must be between 1 and 100");
        return;
      }

      await addToCartMutation.mutateAsync({ productId: id, quantity });
      setVisible(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className='product-page'>
      <div className='product-container'>
        <div className='product-image'>
          <img src={product.image} alt={product.name} />
        </div>

        <div className='product-info'>
          <h1 className='product-title'>{product.name}</h1>

          <div className='product-price'>
            <span className='original-price'>{product.price} ₽</span>
          </div>

          <div className='product-controls'>
            <div className='quantity-control'>
              <button
                className='quantity-btn'
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type='number'
                value={quantity}
                min='1'
                max='100'
                className='quantity-input'
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
              <button
                className='quantity-btn'
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 100}
              >
                +
              </button>
            </div>
            {error && <div className='error-message'>{error}</div>}
            <Cart visible={visible} onVisibleChange={(e) => setVisible(e)} />
            <button
              className='add-to-cart-btn'
              onClick={handleAddToCart}
              disabled={addToCartMutation.isLoading}
            >
              {addToCartMutation.isLoading ? "Adding..." : "Add to cart"}
            </button>
          </div>

          <div className='product-details'>
            <div className='detail-item'>
              <span className='detail-label'>Категория:</span>
              <span className='detail-value'>{product.Category.name}</span>
            </div>
            <div className='detail-item' style={{ flexDirection: "column" }}>
              <span className='detail-label'>Описание:</span>
              <span className='detail-value'>{product.description}</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Количество:</span>
              <span className='detail-value'>{product.stock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
