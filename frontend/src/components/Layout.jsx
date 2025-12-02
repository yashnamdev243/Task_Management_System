import { Layout as AntLayout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const { Header, Content } = AntLayout;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <FaTasks />
          <span>Task Manager</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            {
              key: "user",
              label: user ? `Hi, ${user.name}` : "Account"
            },
            {
              key: "logout",
              label: "Logout",
              onClick: handleLogout
            }
          ]}
        />
      </Header>
      <Content className="p-4 bg-slate-100">{children}</Content>
    </AntLayout>
  );
}