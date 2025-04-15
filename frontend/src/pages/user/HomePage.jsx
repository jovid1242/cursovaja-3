import { Layout, Typography, Button, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../styles/pages/HomePage.scss";
import Sale from "../../components/Sale";
import { useProducts } from "../../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
const { Title } = Typography;

const slideImages = [
  {
    url: "https://htmldemo.net/urdan/urdan/assets/images/slider/slider-img-1.png",
    alt: "Featured Chair 1",
  },
  {
    url: "https://htmldemo.net/urdan/urdan/assets/images/product/single-product.png",
    alt: "Featured Chair 2",
  },
  {
    url: "https://htmldemo.net/urdan/urdan/assets/images/product/single-product-2.png",
    alt: "Featured Chair 3",
  },
];

const slideVariants = {
  enter: { opacity: 0, scale: 0.95 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: topProductsData = { count: 0, rows: [] } } = useProducts({
    limit: 4,
    sort: "rating",
  });
  const { data: newProductsData = { count: 0, rows: [] } } = useProducts({
    limit: 20,
    sort: "createdAt",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className='hero-section'>
        <div className='hero-content'>
          <Title level={2} className='collection-title'>
            Лучшие коллекции
          </Title>
          <Button
            type='primary'
            size='large'
            onClick={() => navigate("/products")}
          >
            Посмотреть <ArrowRightOutlined />
          </Button>
        </div>
        <div className='hero-image'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.img
              key={currentImageIndex}
              src={slideImages[currentImageIndex].url}
              alt={slideImages[currentImageIndex].alt}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className='deal-section'>
        <Title level={3}>Топ товары</Title>
        <Row gutter={[24, 24]}>
          {topProductsData.rows.map((product, index) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className='card'
              >
                <ProductCard product={product} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      <Sale />

      <div className='deal-section'>
        <Title level={3}>Новинки</Title>
        <Row gutter={[24, 24]}>
          {newProductsData.rows.map((product, index) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className='card'
              >
                <ProductCard product={product} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
