import { Button, Card, Form, Input, Typography, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice.js";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect } from "react";

const { Title } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  
  // Already logged in → redirect
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onFinish = (values) => {
    // dispatch(loginUser(values)).then((res) => {
    //   if (res.type.endsWith("fulfilled")) {
    //     navigate("/");
    //   }
    // });
    dispatch(loginUser(values)).then((res) => {
  if (res.type.endsWith("fulfilled")) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === "admin") {
      navigate("/admin/dashboard"); // admin ko admin page
    } else {
      navigate("/"); // normal user ko home page
    }
  }
});

  };

  // if (token) {
  //   navigate("/");
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <FaSignInAlt className="text-xl" />
          <Title level={3} className="!mb-0">
            Login
          </Title>
        </div>
        {error && (
          <Alert type="error" message={error} className="mb-3" showIcon />
        )}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Login
          </Button>
        </Form>
        <p className="mt-3 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}