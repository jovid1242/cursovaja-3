import React from "react";
import { Table, Button, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateStatusUser } from "../../hooks/useApi";

const { Option } = Select;

const UsersTable = ({ users, isLoading }) => {
  const updateStatusUser = useUpdateStatusUser();

  const handleRoleChange = async (record, newRole) => {
    try {
      await updateStatusUser.mutateAsync({ id: record.id, status: newRole });
      message.success("Роль пользователя успешно обновлена");
    } catch (error) {
      message.error("Ошибка при обновлении роли пользователя");
    }
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
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          Удалить
        </Button>
      ),
    },
  ];

  const handleDelete = (record) => {
    // TODO: Implement delete functionality
    console.log("Delete:", record);
  };

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{ pageSize: 10 }}
      style={{ marginTop: "16px" }}
      loading={isLoading}
      scroll={{ x: 890 }}
    />
  );
};

export default UsersTable;
