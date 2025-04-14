import React from "react";
import { Table, Button, Select, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const UsersTable = ({ users, isLoading }) => {
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
          onChange={(value) => handleRoleChange(record, value)}
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

  const handleRoleChange = (record, newRole) => {
    // TODO: Implement role change functionality
    console.log("Change role:", record, newRole);
  };

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
    />
  );
};

export default UsersTable;
