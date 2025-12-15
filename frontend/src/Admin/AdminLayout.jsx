import { Layout, Menu, Modal, Dropdown, Avatar } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileDoneOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const { Sider, Header, Content } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      okType: "danger",
      centered: true,
      onOk: () => handleLogout(),
    });
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Profile</span>,
          icon: <UserOutlined />,
          className: "!text-blue-600 hover:!bg-blue-100 rounded-md",
            onClick: () => navigate("/admin/profile"),
        },
        {
          key: "2",
          label: <span>Logout</span>,
          icon: <LogoutOutlined />,
            className: "!text-red-600 hover:!bg-red-100 rounded-md",
            onClick: showLogoutConfirm,
            
        },
      ]}
    />
  );

  return (
    <Layout className="min-h-screen">
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={230}
        className="shadow-xl"
        breakpoint="lg"
        collapsedWidth="0"
        theme="dark"
        style={{
          background:
            "linear-gradient(180deg, #111827 0%, #1f2937 50%, #111827 100%)",
        }}
      >
        {/* LOGO */}
        <div className="py-6 text-center text-white font-bold tracking-wide text-xl">
          {collapsed ? "A" : "Admin Panel"}
        </div>

        {/* SIDE MENU */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          className="mt-2"
          style={{ background: "transparent" }}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/admin/dashboard">Dashboard</Link>,
              className: "hover:bg-gray-700 rounded-md",
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">User Management</Link>,
            },
            {
              key: "tasks",
              icon: <FileDoneOutlined />,
              label: <Link to="/admin/tasks">Task Management</Link>,
            },
            // {
            //   key: "logs",
            //   icon: <ClockCircleOutlined />,
            //   label: <Link to="/admin/logs">Activity Logs</Link>,
            // },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              onClick: showLogoutConfirm,
             label: <span>Logout</span>,
              
            },
          ]}
        />
      </Sider>

      {/* RIGHT SIDE */}
      <Layout>
        {/* TOP HEADER */}
        <Header className="bg-white shadow flex justify-between items-center px-6 sticky top-0 z-50">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {collapsed ? (
              <MenuUnfoldOutlined
                className="text-xl cursor-pointer"
                onClick={() => setCollapsed(false)}
              />
            ) : (
              <MenuFoldOutlined
                className="text-xl cursor-pointer"
                onClick={() => setCollapsed(true)}
              />
            )}

            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Welcome, {user?.name}
            </h1>
          </div>

          {/* RIGHT – USER MENU */}
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar style={{ backgroundColor: "#4f46e5" }}>
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <span className="font-semibold">{user?.name}</span>
            </div>
          </Dropdown>
        </Header>

        {/* CONTENT AREA */}
        <Content className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
