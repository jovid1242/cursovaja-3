import { Layout, Typography, Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../styles/pages/HomePage.scss";
import Sale from "../../components/Sale";
import { useProducts } from "../../hooks/useApi";
const { Title } = Typography;

const HomePage = () => {
  const { data: topProductsData = { count: 0, rows: [] } } = useProducts({
    limit: 4,
    sort: "rating",
  });
  const { data: newProductsData = { count: 0, rows: [] } } = useProducts({
    limit: 20,
    sort: "createdAt",
  });

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
        <Title level={3}>Топ товары</Title>
        <Row gutter={[24, 24]}>
          {topProductsData.rows.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <Sale />

      <div className='deal-section'>
        <Title level={3}>Новинки</Title>
        <Row gutter={[24, 24]}>
          {newProductsData.rows.map((product) => (
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
