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
  useOrders,
} from "../../hooks/useApi";
import ProductsTable from "../../components/admin/ProductsTable";
import UsersTable from "../../components/admin/UsersTable";
import OrdersTable from "../../components/admin/OrdersTable";

const { Content } = Layout;

const AdminPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTab, setActiveTab] = useState("products");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: productsData, isLoading: isProductsLoading } = useProducts({
    page: pagination.current,
    limit: pagination.pageSize,
  });
  const { data: usersData, isLoading: isUsersLoading } = useGetUsers();
  const { data: categoriesData } = useCategories({
    enabled: isModalVisible,
  });
  const { data: ordersData, isLoading: isOrdersLoading } = useOrders({
    page: pagination.current,
    limit: pagination.pageSize,
  });
  const createProduct = useCreateProduct();

  const products = productsData?.rows || [];
  const total = productsData?.count || 0;
  const users = usersData || [];
  const categories = categoriesData || [];
  const orders = ordersData?.rows || [];
  const ordersTotal = ordersData?.count || 0;

  const handleCreateProduct = async (values) => {
    try {
      await createProduct.mutateAsync(values);
      messageApi.success("Товар успешно создан");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      messageApi.error("Ошибка при создании товара");
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
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
          pagination={pagination}
          onTableChange={handleTableChange}
        />
      ),
    },
    {
      key: "orders",
      label: "Заказы",
      children: (
        <OrdersTable
          orders={orders}
          total={ordersTotal}
          isLoading={isOrdersLoading}
          pagination={pagination}
          onTableChange={handleTableChange}
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
      {contextHolder}
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
