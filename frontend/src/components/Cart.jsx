import React, { useState } from "react";
import { Button, Drawer, Typography, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Cart = ({ visible, onVisibleChange }) => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Stylish Swing Chair",
      price: 49.0,
      quantity: 1,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product-details/pro-details-large-img-1.png",
    },
    {
      id: 2,
      name: "Modern Chairs",
      price: 49.0,
      quantity: 1,
      image:
        "https://htmldemo.net/urdan/urdan/assets/images/product-details/pro-details-large-img-1.png",
    },
  ]);

  const showDrawer = () => {
    onVisibleChange(true);
  };

  const onClose = () => {
    onVisibleChange(false);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Drawer
        title='Shopping Cart'
        placement='right'
        onClose={onClose}
        open={visible}
        width={400}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            {cartItems.map((item) => (
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
                  src={item.image}
                  alt={item.name}
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div style={{ marginLeft: 15, flex: 1 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {item.name}
                    </Typography.Title>
                    <CloseOutlined style={{ cursor: "pointer" }} />
                  </div>
                  <Typography.Text>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </Typography.Text>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Typography.Title level={4}>Subtotal:</Typography.Title>
              <Typography.Title level={4}>
                ${subtotal.toFixed(2)}
              </Typography.Title>
            </div>

            <Space direction='vertical' style={{ width: "100%" }}>
              <Button type='primary' block size='large'>
                Checkout
              </Button>
            </Space>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
