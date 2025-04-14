import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useProducts,
  useGetUsers,
  useCreateProduct,
  useCategories,
} from "../../hooks/useApi";
import ProductsTable from "../../components/admin/ProductsTable";
import UsersTable from "../../components/admin/UsersTable";

const { Content } = Layout;

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { data: productsData, isLoading: isProductsLoading } = useProducts();
  const { data: usersData, isLoading: isUsersLoading } = useGetUsers();
  const { data: categoriesData } = useCategories();
  const createProduct = useCreateProduct();

  const products = productsData?.rows || [];
  const total = productsData?.count || 0;
  const users = usersData || [];
  const categories = categoriesData || [];

  const handleCreateProduct = async (values) => {
    try {
      await createProduct.mutateAsync(values);
      message.success("Товар успешно создан");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Ошибка при создании товара");
    }
  };

  const items = [
    {
      key: "products",
      label: "Товары",
      children: (
        <ProductsTable
          products={products}
          total={total}
          isLoading={isProductsLoading}
        />
      ),
    },
    {
      key: "users",
      label: "Пользователи",
      children: <UsersTable users={users} isLoading={isUsersLoading} />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
            tabBarExtraContent={
              activeTab === "products" && (
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalVisible(true)}
                >
                  Создать товар
                </Button>
              )
            }
          />
        </div>

        <Modal
          title='Создать новый товар'
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout='vertical' onFinish={handleCreateProduct}>
            <Form.Item
              name='name'
              label='Название'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название товара",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='categoryId'
              label='Категория'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите категорию",
                },
              ]}
            >
              <Select
                placeholder='Выберите категорию'
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name='price'
              label='Цена'
              rules={[
                { required: true, message: "Пожалуйста, введите цену товара" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name='stock'
              label='Количество'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите количество товара",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Form.Item
              name='image'
              label='URL изображения'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите URL изображения",
                },
              ]}
            >
              <Input placeholder='https://example.com/image.jpg' />
            </Form.Item>
            <Form.Item
              name='description'
              label='Описание'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите описание товара",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={createProduct.isPending}
              >
                Создать
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminPage;
