// import { Button, Card, Form, Input, Typography, Alert } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/authSlice.js";
// import { FaUserPlus } from "react-icons/fa";

// const { Title } = Typography;

// export default function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const onFinish = (values) => {
//     dispatch(registerUser(values)).then((res) => {
//       if (res.type.endsWith("fulfilled")) {
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-slate-100">
//       <Card className="w-full max-w-md shadow-lg">
//         <div className="flex items-center gap-2 mb-4">
//           <FaUserPlus className="text-xl" />
//           <Title level={3} className="!mb-0">
//             Register
//           </Title>
//         </div>
//         {error && (
//           <Alert type="error" message={error} className="mb-3" showIcon />
//         )}
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input placeholder="Enter name" />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please enter your email" }]}
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please enter your password" }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full"
//             loading={loading}
//           >
//             Register
//           </Button>
//         </Form>
//         <p className="mt-3 text-center text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600">
//             Login
//           </Link>
//         </p>
//       </Card>
//     </div>
//   );
// }

import { Button, Card, Form, Input, Typography, Alert, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice.js";
import { FaUserPlus } from "react-icons/fa";

const { Title } = Typography;
const { Option } = Select;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(registerUser(values)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <FaUserPlus className="text-xl" />
          <Title level={3} className="!mb-0">Register</Title>
        </div>

        {error && <Alert type="error" message={error} className="mb-3" showIcon />}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

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

          {/* ADD ROLE FIELD */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </Card>
    </div>
  );
}
 