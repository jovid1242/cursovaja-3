import React, { useState } from "react";
import {
  Button,
  Drawer,
  Typography,
  Space,
  Spin,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useCart, useDeleteCartItem, useCreateOrder } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Cart = ({ visible, onVisibleChange }) => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { data: cartItems, isLoading } = useCart({
    enabled: visible,
  });
  const deleteCartItem = useDeleteCartItem();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const onClose = () => {
    onVisibleChange(false);
  };

  const handleDeleteItem = async (cartItemId) => {
    try {
      await deleteCartItem.mutateAsync(cartItemId);
      message.success("Товар удален из корзины");
    } catch (error) {
      message.error("Не удалось удалить товар из корзины");
    }
  };

  const handleCheckout = () => {
    setPaymentModalVisible(true);
  };

  const handlePaymentSubmit = async (values) => {
    try {
      await createOrder.mutateAsync(values);
      message.success("Заказ успешно оформлен");
      setPaymentModalVisible(false);
      onClose();
      navigate("/profile");
    } catch (error) {
      message.error("Не удалось оформить заказ");
    }
  };

  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.Product.price * item.quantity,
      0
    ) || 0;

  return (
    <>
      <Drawer
        title='Корзина'
        placement='right'
        onClose={onClose}
        open={visible}
        width={400}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spin size='large' />
              </div>
            ) : cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    marginBottom: 20,
                    padding: 10,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <img
                    src={item.Product.image}
                    alt={item.Product.name}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <div style={{ marginLeft: 15, flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {item.Product.name}
                      </Typography.Title>
                      <CloseOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteItem(item.id)}
                      />
                    </div>
                    <Typography.Text>
                      {item.quantity} × {item.Product.price.toFixed(2)} ₽
                    </Typography.Text>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Typography.Text>Ваша корзина пуста</Typography.Text>
              </div>
            )}
          </div>

          {!isLoading && cartItems?.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Typography.Title level={4}>Сумма:</Typography.Title>
                <Typography.Title level={4}>
                  {subtotal.toFixed(2)} ₽
                </Typography.Title>
              </div>

              <Space direction='vertical' style={{ width: "100%" }}>
                <Button
                  type='primary'
                  block
                  size='large'
                  onClick={handleCheckout}
                  loading={createOrder.isLoading}
                >
                  Оформить заказ
                </Button>
              </Space>
            </div>
          )}
        </div>
      </Drawer>

      <Modal
        title='Оформление заказа'
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handlePaymentSubmit}
          requiredMark={false}
        >
          <Form.Item
            label='Номер карты'
            name='cardNumber'
            rules={[
              { required: true, message: "Пожалуйста, введите номер карты" },
              {
                pattern: /^\d{16}$/,
                message: "Номер карты должен содержать 16 цифр",
              },
            ]}
          >
            <Input placeholder='1234 5678 9012 3456' maxLength={16} />
          </Form.Item>

          <Form.Item
            label='Имя владельца карты'
            name='cardHolder'
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите имя владельца карты",
              },
            ]}
          >
            <Input placeholder='JOHN DOE' />
          </Form.Item>

          <Form.Item
            label='Срок действия карты'
            name='cardExpiry'
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите срок действия карты",
              },
              {
                pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: "Формат: ММ/ГГ",
              },
            ]}
          >
            <Input placeholder='MM/YY' maxLength={5} />
          </Form.Item>

          <Form.Item
            label='Адрес доставки'
            name='shippingAddress'
            rules={[
              { required: true, message: "Пожалуйста, введите адрес доставки" },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder='Введите полный адрес доставки'
            />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={createOrder.isLoading}
              size='large'
            >
              Оплатить {subtotal.toFixed(2)} ₽
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
