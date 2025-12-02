import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Input, Select, Table, Tag } from "antd";
import Layout from "../components/Layout.jsx";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from "../features/tasks/tasksSlice.js";
import { FaPlus } from "react-icons/fa";

const statusColors = {
  pending: "orange",
  in_progress: "blue",
  completed: "green"
};

export default function Tasks() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.tasks);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(createTask(values)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        form.resetFields();
      }
    });
  };

  const handleStatusChange = (task, status) => {
    dispatch(updateTask({ id: task.id, data: { ...task, status } }));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record, value)}
          options={[
            { value: "pending", label: "Pending" },
            { value: "in_progress", label: "In Progress" },
            { value: "completed", label: "Completed" }
          ]}
        />
      )
    },
    {
      title: "Created",
      dataIndex: "created_at"
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button danger onClick={() => dispatch(deleteTask(record.id))}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-6 space-y-4">
        <Card>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Task title" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input placeholder="Short description" />
              </Form.Item>
              <Form.Item label="Status" name="status" initialValue="pending">
                <Select
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "in_progress", label: "In Progress" },
                    { value: "completed", label: "Completed" }
                  ]}
                />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" icon={<FaPlus />}>
              Add Task
            </Button>
          </Form>
        </Card>
        <Card title="Your Tasks">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={items}
            loading={loading}
          />
        </Card>
      </div>
    </Layout>
  );
}