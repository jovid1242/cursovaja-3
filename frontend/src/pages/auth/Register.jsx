import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/RegisterPage.scss";

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { mutate: register, isLoading } = useRegister();
  const { login: authLogin } = useAuth();

  const onFinish = async (values) => {
    try {
      await register(values, {
        onSuccess: (response) => {
          if (response?.token && response?.user) {
            localStorage.setItem("token", response.token);
            authLogin(response.user);
            message.success("Регистрация успешна!");
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 500);
          } else {
            message.error("Ошибка: данные пользователя не получены");
          }
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Ошибка при регистрации"
          );
        },
      });
    } catch (error) {
      message.error("Произошла ошибка при регистрации");
    }
  };

  return (
    <div className='Register'>
      <div className='container'>
        <div className='Register-wrapper'>
          <Title level={2}>Регистрация</Title>
          <Form
            name='register'
            onFinish={onFinish}
            layout='vertical'
            className='register-form'
            autoComplete='off'
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя пользователя",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='Имя пользователя'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                { required: true, message: "Пожалуйста, введите email" },
                { type: "email", message: "Введите корректный email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder='Email'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
                {
                  min: 6,
                  message: "Пароль должен содержать минимум 6 символов",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Пароль'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder='Номер телефона'
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
                Зарегистрироваться
              </Button>
            </Form.Item>

            <div className='login-link'>
              <Text>Уже есть аккаунт? </Text>
              <Link to='/login'>Войти</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
