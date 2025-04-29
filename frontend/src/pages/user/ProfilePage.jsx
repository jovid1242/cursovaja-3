import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Row,
  Col,
  Space,
  Tag,
  Divider,
  Upload,
  Spin,
  Image,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "../../styles/pages/ProfilePage.scss";
import { useAuth } from "../../context/AuthContext";
import { useOrdersByUser, useUpdateProfile } from "../../hooks/useApi";

const { TextArea } = Input;

export default function ProfilePage() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrdersByUser(user?.id);
  const updateProfile = useUpdateProfile();

  const onFinish = async (values) => {
    try {
      await updateProfile.mutateAsync(values);
      message.success("Профиль успешно обновлен");
    } catch (error) {
      message.error("Ошибка при обновлении профиля");
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "processing";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getOrderStatusText = (status) => {
    switch (status) {
      case "pending":
        return "В ожидании";
      case "completed":
        return "Завершен";
      case "processing":
        return "В обработке";
      default:
        return status;
    }
  };

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24}>
            <Card title='Личная информация' className='info-card'>
              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                initialValues={{
                  name: user?.name || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  address: user?.address || "",
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='name'
                      label='Имя'
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите ваше имя!",
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='email'
                      label='Email'
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите ваш email!",
                        },
                      ]}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='phone'
                      label='Телефон'
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите ваш номер телефона!",
                        },
                      ]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='address'
                      label='Адрес'
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, введите ваш адрес!",
                        },
                      ]}
                    >
                      <Input prefix={<HomeOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon={<EditOutlined />}
                  >
                    Обновить профиль
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card title='История заказов' className='orders-card'>
              {isLoading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Spin size='large' />
                </div>
              ) : orders?.length > 0 ? (
                <Space direction='vertical' style={{ width: "100%" }}>
                  {orders.map((order) => (
                    <Card key={order.id} className='order-item'>
                      <Row justify='space-between' align='middle'>
                        <Col>
                          <Space direction='vertical'>
                            <Image
                              width={100}
                              height={100}
                              src={order.Product?.image}
                              alt={order.Product?.name}
                              style={{ objectFit: "cover" }}
                            />
                            <span className='order-id'>Заказ #{order.id}</span>
                            <span className='order-date'>
                              {new Date(order.orderDate).toLocaleDateString()}
                            </span>
                            <span className='product-name'>
                              {order.Product?.name}
                            </span>
                            <span className='quantity'>
                              Количество: {order.quantity}
                            </span>
                          </Space>
                        </Col>
                        <Col>
                          <Tag color={getOrderStatusColor(order.status)}>
                            {getOrderStatusText(order.status)}
                          </Tag>
                        </Col>
                        <Col>
                          <span className='order-total'>
                            {(order?.totalPrice || 0).toFixed(2)} ₽
                          </span>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Space>
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>У вас пока нет заказов</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
