import { Layout, Typography, Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../styles/pages/HomePage.scss";
import Sale from "../../components/Sale";
const { Title } = Typography;

const HomePage = () => {
  const dealProducts = [
    {
      id: 4,
      name: "Modern Armchair",
      price: 399.99,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product/product-2.png",
      discount: 30,
    },
    {
      id: 5,
      name: "Designer Sofa",
      price: 899.99,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product/product-2.png",
      discount: 25,
    },
    {
      id: 6,
      name: "Leather Recliner",
      price: 599.99,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product/product-2.png",
      discount: 20,
    },
    {
      id: 7,
      name: "Dining Chair Set",
      price: 299.99,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product/product-2.png",
      discount: 15,
    },
  ];

  return (
    <div>
      <div className='hero-section'>
        <div className='hero-content'>
          <Title level={2} className='collection-title'>
            Summer Collection
          </Title>
          <Button type='primary' size='large'>
            Shop Now <ArrowRightOutlined />
          </Button>
        </div>
        <div className='hero-image'>
          <img
            src='https://htmldemo.net/urdan/urdan/assets/images/slider/slider-img-1-2.png'
            alt='Featured Chair'
          />
        </div>
      </div>

      <div className='deal-section'>
        <Title level={3}>DEAL OF THE DAY</Title>
        <Row gutter={[24, 24]}>
          {dealProducts.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <Sale />

      <div className='deal-section'>
        <Title level={3}>Hot Products</Title>
        <Row gutter={[24, 24]}>
          {dealProducts.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
