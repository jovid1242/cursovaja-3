import React from "react";
import { Button, Drawer, Typography, Space, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useCart, useDeleteCartItem } from "../hooks/useApi";

const Cart = ({ visible, onVisibleChange }) => {
  const { data: cartItems, isLoading } = useCart({
    enabled: visible,
  });
  const deleteCartItem = useDeleteCartItem();

  const onClose = () => {
    onVisibleChange(false);
  };

  const handleDeleteItem = async (cartItemId) => {
    try {
      await deleteCartItem.mutateAsync(cartItemId);
      message.success("Item removed from cart");
    } catch (error) {
      message.error("Failed to remove item from cart");
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
                      {item.quantity} × ${item.Product.price.toFixed(2)}
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
                <Button type='primary' block size='large'>
                  Оформить заказ
                </Button>
              </Space>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
