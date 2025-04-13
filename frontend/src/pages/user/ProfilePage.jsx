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

const { TextArea } = Input;

export default function ProfilePage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24}>
            <Card title='Personal Information' className='info-card'>
              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                initialValues={{
                  name: "John Doe",
                  email: "john.doe@example.com",
                  phone: "+1 234 567 890",
                  address: "123 Main St, City, Country",
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

            <Card title='Recent Orders' className='orders-card'>
              <Space direction='vertical' style={{ width: "100%" }}>
                <Card className='order-item'>
                  <Row justify='space-between' align='middle'>
                    <Col>
                      <Space direction='vertical'>
                        <span className='order-id'>Order #12345</span>
                        <span className='order-date'>Jan 15, 2024</span>
                      </Space>
                    </Col>
                    <Col>
                      <Tag color='success'>Delivered</Tag>
                    </Col>
                    <Col>
                      <span className='order-total'>$199.99</span>
                    </Col>
                  </Row>
                </Card>

                <Card className='order-item'>
                  <Row justify='space-between' align='middle'>
                    <Col>
                      <Space direction='vertical'>
                        <span className='order-id'>Order #12344</span>
                        <span className='order-date'>Jan 10, 2024</span>
                      </Space>
                    </Col>
                    <Col>
                      <Tag color='processing'>Processing</Tag>
                    </Col>
                    <Col>
                      <span className='order-total'>$89.99</span>
                    </Col>
                  </Row>
                </Card>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
