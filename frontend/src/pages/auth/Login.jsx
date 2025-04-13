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
  const { mutate: login, isLoading } = useLogin();
  const { login: authLogin } = useAuth();

  const onFinish = async (values) => {
    try {
      await login(values, {
        onSuccess: (response) => {
          if (response?.token && response?.user) {
            localStorage.setItem("token", response.token);
            authLogin(response.user);
            message.success("Успешный вход!");
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 500);
          } else {
            message.error("Ошибка: данные пользователя не получены");
          }
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Ошибка при входе");
        },
      });
    } catch (error) {
      message.error("Произошла ошибка при входе");
    }
  };

  return (
    <div className='Login'>
      <div className='container'>
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
