import { Link, useNavigate } from "react-router-dom";
import "../styles/components/ProductCard.scss";
import { useAuth } from "../context/AuthContext";
import { useAddToCart } from "../hooks/useApi";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductCard = ({ product }) => {
  const { id, name, price, image, discount } = product;
  const navigate = useNavigate();
  const { user } = useAuth();
  const addToCartMutation = useAddToCart();
  const originalPrice = discount
    ? ((price * 100) / (100 - discount)).toFixed(2)
    : null;

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation to product page
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToCartMutation.mutateAsync({ productId: id, quantity: 1 });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <Link to={`/product/${id}`} className='product-link'>
      <div className='product-card'>
        <div className='image-container'>
          <img src={image} alt={name} />
          {discount > 0 && <span className='discount-badge'>-{discount}%</span>}
        </div>
        <div className='product-info'>
          <h3 className='product-name'>{name}</h3>
          <div className='price-container'>
            {originalPrice && (
              <span className='original-price'>{originalPrice}₽</span>
            )}
            <span className='current-price'>{price}₽</span>
          </div>
          <Button
            type='primary'
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            loading={addToCartMutation.isLoading}
            block
            style={{ marginTop: "10px" }}
          >
            В корзину
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
