// import { Layout as AntLayout, Menu } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authSlice.js";
// import { useNavigate } from "react-router-dom";
// import { FaTasks } from "react-icons/fa";

// const { Header, Content } = AntLayout;

// export default function Layout({ children }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <AntLayout className="min-h-screen">
//       <Header className="flex items-center justify-between bg-slate-900">
//         <div className="flex items-center gap-2 text-white font-semibold text-lg">
//           <FaTasks />
//           <span>Task Manager</span>
//         </div>
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           selectable={false}
//           items={[
//             {
//               key: "user",
//               label: user ? `Hi, ${user.name}` : "Account"
//             },
//             {
//               key: "logout",
//               label: "Logout",
//               onClick: handleLogout
//             }
//           ]}
//         />
//       </Header>
//       <Content className="p-4 bg-slate-100">{children}</Content>
//     </AntLayout>
//   );
// }





// import { Layout as AntLayout, Menu } from "antd";
// import {
//   FaTasks,
//   FaPlus,
//   FaHome,
//   FaUserCircle,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authSlice.js";
// import { useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = AntLayout;

// export default function Layout({ children }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <AntLayout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider
//         breakpoint="lg"
//         collapsible
//         width={230}
//         style={{
//           backgroundColor: "#1e293b",
//           overflow: "auto",
//           height: "100vh",
//           position: "fixed",
//           left: 0,
//         }}
//       >
//         <div
//           style={{
//             color: "white",
//             fontSize: "20px",
//             padding: "20px",
//             textAlign: "center",
//             fontWeight: "bold",
//             borderBottom: "1px solid #334155",
//           }}
//         >
//           <FaTasks style={{ marginRight: "8px" }} />
//           Task Manager
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["tasks"]}
//           style={{
//             backgroundColor: "#1e293b",
//             paddingTop: "10px",
//           }}
//           items={[
//             {
//               key: "home",
//               icon: <FaHome />,
//               label: "Dashboard",
//               onClick: () => navigate("/"),
//             },
//             {
//               key: "tasks",
//               icon: <FaTasks />,
//               label: "Tasks",
//               onClick: () => navigate("/tasks"),
//             },
//             {
//               key: "add",
//               icon: <FaPlus />,
//               label: "Add New Task",
//               onClick: () => navigate("/tasks"),
//             },
//             {
//               type: "divider",
//             },
//             {
//               key: "user",
//               icon: <FaUserCircle />,
//               label: user ? `Hi, ${user.name}` : "Account",
//             },
//             {
//               key: "logout",
//               icon: <FaSignOutAlt />,
//               label: "Logout",
//               onClick: handleLogout,
//             },
//           ]}
//         />
//       </Sider>

//       {/* Main layout */}
//       <AntLayout style={{ marginLeft: 230 }}>
//         <Header
//           style={{
//             background: "white",
//             padding: "12px 24px",
//             borderBottom: "1px solid #e2e8f0",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//           }}
//         >
//           <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
//             {user ? `Welcome, ${user.name}` : "Welcome"}
//           </h2>

//           <div style={{ fontSize: "15px" }}>
//             {user?.email}
//           </div>
//         </Header>

//         <Content
//           style={{
//             margin: "20px",
//             padding: "20px",
//             background: "white",
//             borderRadius: "10px",
//             minHeight: "80vh",
//           }}
//         >
//           {children}
//         </Content>
//       </AntLayout>
//     </AntLayout>
//   );
// }



import { Layout as AntLayout, Dropdown, Menu , Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { FaTasks, FaHome, FaUser, FaCog, FaCalendar ,FaUserCircle, FaSignOutAlt, FaTrello} from "react-icons/fa";
import React, { useState } from "react";

const { Header, Sider, Content } = AntLayout;

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
const menuItems = (
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

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      
      <Sider  
      theme="light"
       collapsible     
       collapsed={collapsed}
       onCollapse={(value) => setCollapsed(value)}
       className="bg-[#0892AE]"
       
>
       {/* Sidebar Top Logo / Title */}
      <div
        className="text-white text-center font-bold py-4 border-b border-gray-600 cursor-pointer flex items-center justify-center gap-2"
        onClick={() => navigate("/")}
      >
        <FaTasks className="text-white text-2xl" />
        {!collapsed && <span className="text-xl">Task Manager</span>}
      </div>


        <Menu
        theme="light"
          className="bg-[#0892AE] mt-4 text-white custom-menu"
          mode="inline"
          items={[
            {
              key: "dashboard",
              icon: <FaHome />,
              label: "Dashboard",
              onClick: () => navigate("/"),
              className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md"
            },
            {
              key: "tasks",
              icon: <FaTasks />,
              label: "Tasks",
              onClick: () => navigate("/tasks"),
              className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md"
              
            },
           
            { key: "calendar", icon: <FaCalendar />, label: "Calendar", onClick: () => navigate("/calendar"),className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md" },
            { key: "kanban", icon: <FaTrello />, label: "Kanban", onClick: () => navigate("/kanban"),
              className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md"
             },
            {
              key: "profile",
              icon: <FaUser />,
              label: "Profile",
              onClick: () => navigate("/profile"),
              className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md"
            },
            {
              key: "logout",
              icon: <FaCog />,
              label: "Logout",
              onClick: showLogoutConfirm,
              className: "!text-white hover:!bg-white hover:!text-cyan-700 rounded-md"
            }
          ]}
        />
      </Sider>

      <AntLayout>
        
       {/* Header */}
      <Header className="bg-gradient-to-r from-cyan-600 to-green-600 shadow-md text-white flex justify-end items-center px-5 ">
          <Dropdown overlay={menuItems} trigger={["click"]}>

        <div className="flex items-center gap-2 text-md bg-white text-cyan-700 px-2 h-10 rounded-lg shadow-md cursor-pointer select-none">
          <FaUserCircle className="text-cyan-700 text-2xl" />
          Hi, {user?.name}
        </div>
          </Dropdown>

      </Header>

        <Content className="p-6 bg-gray-100 min-h-screen">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export default React.memo(Layout);
