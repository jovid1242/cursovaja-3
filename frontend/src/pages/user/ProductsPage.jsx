import React, { useState } from "react";
import { Select, Slider, Input, Form, Row, Col, Typography } from "antd";
import "../../styles/pages/ProductsPage.scss";
import ProductCard from "../../components/ProductCard";

const { Title } = Typography;

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

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([36951, 430599]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className='ProductsPage'>
      <div className='container'>
        <div className='ProductsPage-wrapper'>
          <div className='ProductsPage-wrapper__left'>
            <h2>Products</h2>
            <div className='filter-section'>
              <Form layout='vertical'>
                <Form.Item name='name'>
                  <Input placeholder='Поиск по названию' />
                </Form.Item>
                <Form.Item name='category'>
                  <Select
                    showSearch
                    style={{ width: 300, marginBottom: 20 }}
                    placeholder='Выберите категорию'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) => {
                      var _a, _b;
                      return (
                        (_a =
                          optionA === null || optionA === void 0
                            ? void 0
                            : optionA.label) !== null && _a !== void 0
                          ? _a
                          : ""
                      )
                        .toLowerCase()
                        .localeCompare(
                          ((_b =
                            optionB === null || optionB === void 0
                              ? void 0
                              : optionB.label) !== null && _b !== void 0
                            ? _b
                            : ""
                          ).toLowerCase()
                        );
                    }}
                    options={[
                      {
                        value: "1",
                        label: "Все категории",
                      },
                      {
                        value: "2",
                        label: "Категория 1",
                      },
                      {
                        value: "3",
                        label: "Communicated",
                      },
                      {
                        value: "4",
                        label: "Identified",
                      },
                      {
                        value: "5",
                        label: "Resolved",
                      },
                      {
                        value: "6",
                        label: "Cancelled",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name='price'>
                  <div className='price-filter'>
                    <h3>Цена, ₽</h3>
                    <div className='price-inputs'>
                      <span>{priceRange[0]}</span>
                      <span>{priceRange[1]}</span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      value={priceRange}
                      onChange={handlePriceChange}
                    />
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className='ProductsPage-wrapper__right'>
            <div className='ProductsPage-wrapper__right-section'>
              <h4>Товары (54)</h4>
              <Row gutter={[24, 24]}>
                {dealProducts.map((product) => (
                  <Col xs={24} sm={12} md={6} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
