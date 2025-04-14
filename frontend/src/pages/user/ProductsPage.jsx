import React, { useState, useEffect } from "react";
import {
  Select,
  Slider,
  Input,
  Form,
  Row,
  Col,
  Typography,
  Empty,
  Spin,
} from "antd";
import { useSearchParams } from "react-router-dom";
import "../../styles/pages/ProductsPage.scss";
import ProductCard from "../../components/ProductCard";
import { useProducts, useCategories } from "../../hooks/useApi";

const { Title } = Typography;

export default function ProductsPage() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    name: "",
    categoryId: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const { data: productsData, isLoading } = useProducts(filters);
  const { data: categoriesData } = useCategories({ enabled: true });

  const products = productsData?.rows || [];
  const total = productsData?.count || 0;
  const categories = categoriesData || [];

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      setFilters((prev) => ({
        ...prev,
        categoryId: categoryId,
      }));
      form.setFieldsValue({
        categoryId: categoryId,
      });
    }
  }, [searchParams, form]);

  const handleFilterChange = (changedValues) => {
    setFilters((prev) => ({
      ...prev,
      ...changedValues,
    }));
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  return (
    <div className='ProductsPage'>
      <div className='container'>
        <div className='ProductsPage-wrapper'>
          <div className='ProductsPage-wrapper__left'>
            <h2>Products</h2>
            <div className='filter-section'>
              <Form
                form={form}
                layout='vertical'
                onValuesChange={handleFilterChange}
              >
                <Form.Item name='name'>
                  <Input placeholder='Поиск по названию' size='large' />
                </Form.Item>
                <Form.Item name='categoryId'>
                  <Select
                    showSearch
                    style={{ width: 300, marginBottom: 20 }}
                    placeholder='Выберите категорию'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      { value: "", label: "Все категории" },
                      ...categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      })),
                    ]}
                    size='large'
                    className='ant-select-selector3'
                  />
                </Form.Item>
                <Form.Item name='price'>
                  <div className='price-filter'>
                    <h3>Цена, ₽</h3>
                    <div className='price-inputs'>
                      <span>{filters.minPrice}</span>
                      <span>{filters.maxPrice}</span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      value={[filters.minPrice, filters.maxPrice]}
                      onChange={handlePriceChange}
                      size='large'
                    />
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className='ProductsPage-wrapper__right'>
            <div className='ProductsPage-wrapper__right-section'>
              <h4>Товары ({total})</h4>
              <Spin spinning={isLoading}>
                {products.length > 0 ? (
                  <Row gutter={[24, 24]}>
                    {products.map((product) => (
                      <Col xs={24} sm={12} md={6} key={product.id}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty
                    description='Товары не найдены'
                    style={{ marginTop: 50 }}
                  />
                )}
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
