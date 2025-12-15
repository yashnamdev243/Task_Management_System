import {
  Layout as AntLayout,
  Avatar,
  Badge,
  Dropdown,
  List,
  Menu,
  message,
  Modal,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearLoginFlag } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaHome,
  FaUser,
  FaCog,
  FaCalendar,
  FaUserCircle,
  FaSignOutAlt,
  FaTrello,
  FaBell,
} from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { fetchTasks } from "../features/tasks/tasksSlice.js";
import {
  BellOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Header, Sider, Content } = AntLayout;

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.tasks);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    sessionStorage.clear();
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
          key: "profile",
          icon: <FaUser />,
          label: "My Profile",
          onClick: () => navigate("/profile"),
          className: "!text-blue-600 hover:!bg-blue-100 rounded-md",
        },
        {
          key: "settings",
          icon: <FaCog />,
          label: "Settings",
          className: "!text-slate-500 hover:!bg-slate-100 rounded-md",
        },
        {
          key: "logout",
          icon: <FaSignOutAlt />,
          label: "Logout",
          onClick: showLogoutConfirm,
          className: "!text-red-600 hover:!bg-red-100 rounded-md",
        },
      ]}
    />
  );

  // Separate tasks
  const pendingOnly = items.filter((t) => t.status === "pending");
  const inProgressOnly = items.filter((t) => t.status === "in_progress");

  // const loginNotified = useSelector((state) => state.auth.loginNotified);
  // const loginToastShownRef = useRef(false);
const notificationCount = pendingOnly.length + inProgressOnly.length;
  // console.log("Items:", items.length);
  // console.log("Pending:", pendingOnly.length);
  // console.log("InProgress:", inProgressOnly.length);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-900"
      >
        <div
          className="text-white text-center font-bold py-4 border-b border-gray-600 cursor-pointer flex items-center justify-center gap-2"
          onClick={() => navigate("/")}
        >
          <FaTasks className="text-white text-2xl" />
          {!collapsed && <span className="text-xl">Task Manager</span>}
        </div>

        <Menu
          theme="light"
          className="bg-gray-900 mt-4 text-white custom-menu"
          mode="inline"
          items={[
            {
              key: "dashboard",
              icon: <FaHome />,
              label: "Dashboard",
              onClick: () => navigate("/"),
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },
            {
              key: "tasks",
              icon: <FaTasks />,
              label: "Tasks",
              onClick: () => navigate("/tasks"),
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },

            {
              key: "calendar",
              icon: <FaCalendar />,
              label: "Calendar",
              onClick: () => navigate("/calendar"),
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },
            {
              key: "kanban",
              icon: <FaTrello />,
              label: "Kanban",
              onClick: () => navigate("/kanban"),
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },
            {
              key: "profile",
              icon: <FaUser />,
              label: "Profile",
              onClick: () => navigate("/profile"),
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },
            {
              key: "logout",
              icon: <FaCog />,
              label: "Logout",
              onClick: showLogoutConfirm,
              className:
                "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md",
            },
          ]}
        />
      </Sider>

      <AntLayout>
        {/* Header */}
        <Header className="bg-gradient-to-r from-gray-900 to-purple-400/90 shadow-md text-white flex justify-end items-center px-5 gap-6">
          {/*  Notification Bell */}
 



<Badge
  count={
    <span
      className="
        w-6 h-6
        flex items-center justify-center
        rounded-full
        bg-red-500
        text-white
        text-[11px]
        font-bold
        shadow
        border border-white
      "
    >
      {notificationCount > 99 ? "99+" : notificationCount}
    </span>
  }
  offset={[-2, 2]}
>
  <motion.div
    className="relative"
    animate={
      notificationCount > 0
        ? { scale: [1, 1.1, 1] }
        : {}
    }
    transition={{
      duration: 1.6,
      repeat: notificationCount > 0 ? Infinity : 0,
      ease: "easeInOut",
    }}
  >
    {/* Soft glow ring */}
    {notificationCount > 0 && (
      <span className="absolute inset-0 rounded-full bg-purple-400/30 blur-md animate-pulse" />
    )}
<div  className="
        relative z-10 
        text-xl text-white cursor-pointer
       p-2 rounded-full
        bg-gray-700/90
        hover:bg-white hover:!text-purple-700
        transition-all duration-300
        shadow-md hover:shadow-xl
        border border-white/90 hover:border-purple-900/90
      ">
    <FaBell
      onClick={() => navigate("/notifications")}
     
      title="Notifications"
    />
    </div>
  </motion.div>
</Badge>


          {/* User Menu */}
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div className="flex items-center gap-2 text-md bg-white text-purple-700 px-2 h-10 rounded-lg shadow-md cursor-pointer select-none">
              <FaUserCircle className="text-purple-700 text-2xl" />
              Hi, {user?.name}
            </div>
          </Dropdown>
        </Header>

        <Content className="p-6 bg-gray-100 min-h-screen">{children}</Content>
      </AntLayout>
    </AntLayout>
  );
}

export default React.memo(Layout);
