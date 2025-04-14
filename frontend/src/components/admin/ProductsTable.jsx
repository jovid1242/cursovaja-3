import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Image,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteProduct, useUpdateProduct } from "../../hooks/useApi";

const ProductsTable = ({ products, total, isLoading }) => {
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = (record) => {
    setSelectedProduct(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct.id);
      setDeleteModalVisible(false);
      setSelectedProduct(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setSelectedProduct(null);
  };

  const handleEdit = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      description: record.description,
      stock: record.stock,
      image: record.image,
    });
    setEditModalVisible(true);
  };

  const handleEditConfirm = async () => {
    try {
      const values = await form.validateFields();
      if (selectedProduct) {
        updateProduct.mutate({
          id: selectedProduct.id,
          data: values,
        });
        setEditModalVisible(false);
        setSelectedProduct(null);
        form.resetFields();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedProduct(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} ₽`,
    },
    {
      title: "Изображение",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={50}
          height={50}
          src={image}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Количество",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
      render: (_, record) => record.Category?.name,
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Изменить
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10 }}
        style={{ marginTop: "16px" }}
        loading={isLoading}
        rowKey={(record) => record.id}
      />
      <Modal
        title='Подтверждение удаления'
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText='Да'
        cancelText='Нет'
      >
        {selectedProduct && (
          <p>Вы уверены, что хотите удалить товар "{selectedProduct.name}"?</p>
        )}
      </Modal>
      <Modal
        title='Редактирование товара'
        open={editModalVisible}
        onOk={handleEditConfirm}
        onCancel={handleEditCancel}
        okText='Сохранить'
        cancelText='Отмена'
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='name'
            label='Название'
            rules={[
              { required: true, message: "Пожалуйста, введите название" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='price'
            label='Цена'
            rules={[{ required: true, message: "Пожалуйста, введите цену" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              formatter={(value) => `${value} ₽`}
              parser={(value) => value.replace(" ₽", "")}
            />
          </Form.Item>
          <Form.Item
            name='stock'
            label='Количество'
            rules={[
              { required: true, message: "Пожалуйста, введите количество" },
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
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label='Описание'
            rules={[
              { required: true, message: "Пожалуйста, введите описание" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductsTable;
