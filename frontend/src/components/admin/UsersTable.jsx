import React, { useState } from "react";
import { Table, Button, Select, Space, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateStatusUser, useDeleteUser } from "../../hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

const UsersTable = ({ users, isLoading }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const updateStatusUser = useUpdateStatusUser();
  const deleteUser = useDeleteUser();
  const queryClient = useQueryClient();

  const handleRoleChange = async (record, newRole) => {
    try {
      await updateStatusUser.mutateAsync({ id: record.id, status: newRole });
      messageApi.success("Роль пользователя успешно обновлена");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      messageApi.error("Ошибка при обновлении роли пользователя");
    }
  };

  const handleDelete = (record) => {
    setSelectedUser(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser.mutateAsync(selectedUser.id);
      messageApi.success("Пользователь успешно удален");
      setDeleteModalVisible(false);
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      messageApi.error("Ошибка при удалении пользователя");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "Имя пользователя",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          onChange={(value) => {
            console.log("Select onChange value:", value);
            handleRoleChange(record, value);
          }}
          loading={updateStatusUser.isPending}
        >
          <Option value='admin'>Admin</Option>
          <Option value='user'>User</Option>
        </Select>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space size='middle'>
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
      {contextHolder}
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 10 }}
        style={{ marginTop: "16px" }}
        loading={isLoading}
        scroll={{ x: 890 }}
        rowKey={(record) => record.id}
      />
      <Modal
        title='Подтверждение удаления'
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText='Да'
        cancelText='Нет'
        confirmLoading={deleteUser.isPending}
      >
        {selectedUser && (
          <p>
            Вы уверены, что хотите удалить пользователя "{selectedUser.email}"?
          </p>
        )}
      </Modal>
    </>
  );
};

export default UsersTable;
