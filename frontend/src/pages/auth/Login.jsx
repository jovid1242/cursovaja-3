import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/LoginPage.scss";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: login, isLoading } = useLogin();
  const { login: authLogin } = useAuth();

  const onFinish = async (values) => {
    try {
      const response = await login(values, {
        onError: (error) => {
          if (error.response?.status === 401) {
            messageApi.error({
              content: "Неверный email или пароль",
              duration: 2,
            });
          } else {
            messageApi.error({
              content:
                error.response?.data?.message || "Произошла ошибка при входе",
              duration: 2,
            });
          }
        },
        onSuccess: (response) => {
          if (response?.data?.token && response?.data?.user) {
            localStorage.setItem("token", response.data.token);
            authLogin(response.data.user);
            messageApi.success({
              content: "Успешный вход!",
              duration: 2,
            });

            setTimeout(() => {
              if (response.data.user.role === "admin") {
                navigate("/admin", { replace: true });
              } else {
                navigate("/", { replace: true });
              }
            }, 500);
          }
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className='Login'>
      <div className='container'>
        {contextHolder}
        <div className='Login-wrapper'>
          <Title level={2}>Вход</Title>
          <Form
            name='login'
            onFinish={onFinish}
            layout='vertical'
            className='login-form'
            autoComplete='off'
          >
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите email",
                },
                {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Пожалуйста, введите корректный email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='Email'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Пароль'
                size='large'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={isLoading}
              >
                Войти
              </Button>
            </Form.Item>

            <div className='register-link'>
              <Text>Нет аккаунта? </Text>
              <Link to='/register'>Зарегистрироваться</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
