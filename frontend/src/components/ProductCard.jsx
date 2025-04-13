import { Link } from "react-router-dom";
import "../styles/components/ProductCard.scss";

const ProductCard = ({ product }) => {
  const { id, name, price, image, discount } = product;
  const originalPrice = discount
    ? ((price * 100) / (100 - discount)).toFixed(2)
    : null;

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
              <span className='original-price'>${originalPrice}</span>
            )}
            <span className='current-price'>${price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
