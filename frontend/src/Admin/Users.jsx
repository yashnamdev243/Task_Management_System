import {
  Table,
  Button,
  Select,
  Popconfirm,
  message,
  Avatar,
  Card,
  Modal,
  Form,
  Input,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaUserPlus } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { HiUserRemove } from "react-icons/hi";
import { FiFilter, FiSearch } from "react-icons/fi";
import { BsFillFilterCircleFill } from "react-icons/bs";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const loadUsers = () => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ADD USER
  const addUser = () => {
    addForm.validateFields().then((values) => {
      api.post("/admin/users/add", values).then(() => {
        message.success("User added!");
        setIsAddOpen(false);
        addForm.resetFields();
        loadUsers();
      });
    });
  };

  // OPEN EDIT MODAL
  const openEditModal = (user) => {
    setSelectedUser(user);
    editForm.setFieldsValue({ ...user, password: "" });
    setIsEditOpen(true);
  };

  // SAVE EDIT
  const saveUserChanges = () => {
    editForm.validateFields().then((values) => {
      api.put(`/admin/users/${selectedUser.id}/edit`, values).then(() => {
        message.success("User updated!");
        setIsEditOpen(false);
        loadUsers();
      });
    });
  };

  // DELETE USER
  const deleteUser = (id) => {
    api.delete(`/admin/users/${id}`).then(() => {
      message.success("User deleted");
      loadUsers();
    });
  };

  const roleColors = {
    admin: "bg-green-100 text-green-700 border border-green-300",
    user: "bg-blue-100 text-blue-700 border border-blue-300",
  };

  // FILTERED USERS (SEARCH)
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-md rounded-2xl p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

        <div className="flex gap-3 w-full md:w-auto">
          <Input
            placeholder="Search users..."
            prefix={<FiSearch color="gray" />}
            className="rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
<Tooltip title="Add User">
          <Button
            icon={<FaUserPlus />}
            onClick={() => setIsAddOpen(true)}
            className="rounded-md bg-blue-500 text-white hover:!text-blue-500 hover:!border-blue-500"
          >
            Add User
          </Button>
            </Tooltip>
        </div>
      </div>

      {/* USER TABLE */}
      <Table
        rowKey="id"
        dataSource={filteredUsers}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => (
            <p>
              Total <span className="font-semibold">{total}</span> Users
            </p>
          ),
          className: "mx-4 custom-pagination",
          responsive: true,
          onChange: () => {
            window.scrollTo({ top: 250, behavior: "smooth" });
          },
        }}
        className=""
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#1C2533",
                  color: "white",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              />
            ),
          },
        }}
        rowClassName={() => "hover:bg-gray-50 transition-all cursor-pointer"}
        // className="rounded-xl overflow-hidden"
        columns={[
          {
            id: "number",
            title: "Sr No.",
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1,
            width: 60,
            fixed: "left",
          },
          {
            title: "User",

            render: (row) => (
              <div className="flex items-center gap-3">
                <Avatar size={40} style={{ backgroundColor: "#4f46e5" }}>
                  {row.name?.charAt(0).toUpperCase()}
                </Avatar>

                <div>
                  <div className="font-semibold text-gray-800">{row.name}</div>
                  <div className="text-gray-500 text-sm">{row.email}</div>
                </div>
              </div>
            ),
          },

          {
            title: "Role",
            dataIndex: "role",

            // 🌟 Color filter icon
            
            filterIcon: (filtered) => (
              <span
                style={{
                  color: filtered ? "black" : "white",
                  fontSize: "18px",
                }}
              >
                <BsFillFilterCircleFill />
              </span>
            ),
            filterDropdown: ({
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
            }) => (
              <div className="p-4 w-40 flex flex-col gap-2 shadow-xl rounded-xl bg-white">
                <div className="text-gray-700 font-semibold text-sm">
                  Select Role
                </div>
                <Select
                  value={selectedKeys[0]}
                  placeholder="Select Role"
                  onChange={(val) => setSelectedKeys(val ? [val] : [])}
                >
                  <Select.Option value="admin">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      Admin
                    </span>
                  </Select.Option>
                  <Select.Option value="user">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      User
                    </span>
                  </Select.Option>
                </Select>
                <div className="flex gap-3 mt-1">
                  <Button
                    type="primary"
                    size="small"
                    className="flex-1 !rounded-md"
                    onClick={() => confirm()}
                  >
                    Apply
                  </Button>
                  <Button
                    size="small"
                    className="flex-1 !rounded-md"
                    onClick={() => {
                      clearFilters();
                      confirm();
                    }}
                  >
                    Reset
                  </Button>
                </div>
                a
              </div>
            ),

            onFilter: (value, record) => record.role === value,

            render: (role) => (
              <div
                className={`px-2 py-1 rounded-md text-xs font-semibold w-16 mx-auto text-center ${roleColors[role]}`}
              >
                {role.toUpperCase()}
              </div>
            ),
          },

          // ===== ACTIONS COLUMN =====
          {
            title: "Actions",
            width: 160,
            render: (row) => (
              <div className="flex gap-2">
                <Tooltip title="Edit User">
                <Button
                  icon={<FaUserPen />}
                  className="rounded-md bg-green-600 text-white hover:!text-green-600 hover:!border-green-600"
                  onClick={() => openEditModal(row)}
                >
                  Edit
                </Button>
                </Tooltip>

                <Popconfirm
                  title="Delete this user?"
                  onConfirm={() => deleteUser(row.id)}
                >
                                      <Tooltip title="Delete User">
                    
                  <Button
                    icon={<HiUserRemove className="text-base mt-1" />}
                    className="rounded-md bg-red-500 text-white hover:!text-red-500 hover:!border-red-500"
                  >
                    Delete
                  </Button>
                                        </Tooltip>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      {/* ADD USER MODAL */}
      <Modal
        title={
          <span className="flex justify-center text-lg text-white bg-blue-600 py-2 rounded-md mb-4">
            Add New User
          </span>
        }
        open={isAddOpen}
        onCancel={() => setIsAddOpen(false)}
        onOk={addUser}
        okText="Create"
        className="rounded-xl"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="user">
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal
        title={
          <span className="flex justify-center text-lg text-white bg-green-600 py-2 rounded-md mb-4">
            Edit User
          </span>
        }
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={saveUserChanges}
        okText="Save"
        okButtonProps={{
          style: {
            backgroundColor: "#16a34a", // green-600
            borderColor: "#16a34a",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
            padding: "6px 18px",
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: "8px",
            padding: "6px 18px",
          },
        }}
        className="rounded-xl"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Change Password (optional)" name="password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
