import React from "react";
import { Table, Tag, Select, message, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateOrder, useDeleteOrder } from "../../hooks/useApi";

const OrdersTable = ({ orders, isLoading, pagination, onTableChange }) => {
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder.mutateAsync({
        id: orderId,
        data: { status: newStatus },
      });
      message.success("Статус заказа успешно обновлен");
    } catch (error) {
      message.error("Ошибка при обновлении статуса заказа");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder.mutateAsync(orderId);
      message.success("Заказ успешно удален");
    } catch (error) {
      message.error("Ошибка при удалении заказа");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "completed":
        return "green";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "processing":
        return "В обработке";
      case "completed":
        return "Завершен";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Пользователь",
      dataIndex: ["User", "username"],
      key: "user",
    },
    {
      title: "Товар",
      dataIndex: ["Product", "name"],
      key: "product",
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Сумма",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price.toFixed(2)} ₽`,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={[
            { value: "pending", label: "Ожидает" },
            { value: "processing", label: "В обработке" },
            { value: "completed", label: "Завершен" },
          ]}
        />
      ),
    },
    {
      title: "Дата заказа",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title='Удалить заказ?'
          description='Вы уверены, что хотите удалить этот заказ?'
          onConfirm={() => handleDeleteOrder(record.id)}
          okText='Да'
          cancelText='Нет'
        >
          <Button
            type='text'
            danger
            icon={<DeleteOutlined />}
            loading={deleteOrder.isPending}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey='id'
      loading={isLoading}
      pagination={pagination}
      onChange={onTableChange}
    />
  );
};

export default OrdersTable;
