import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Table,
  Modal,
  message,
  DatePicker,
  Tooltip,
} from "antd";
import Layout from "../components/Layout.jsx";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/tasksSlice.js";
import { FaEdit, FaTrash, FaTasks, FaSearch, FaFlag, FaBolt } from "react-icons/fa";
import { RiApps2AddLine } from "react-icons/ri";
import dayjs from "dayjs";
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  ArrowDownOutlined,
  MinusOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { PiArticleMediumLight } from "react-icons/pi";


export default function Tasks() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.tasks);

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // OPEN ADD MODAL
  const openAddModal = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (task) => {
    setEditingTask(task);
    // form.setFieldsValue(task);
    form.setFieldsValue({
    ...task,
    due_date: task.due_date ? dayjs(task.due_date) : null, 
  });
    setIsModalOpen(true);
  };

  // CREATE / UPDATE
  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      due_date: values.due_date
        ? values.due_date.format("YYYY-MM-DD")
        : null,
    };
    console.log("Form Values: ", formattedValues);
    if (editingTask) {
      const res = await dispatch(
        updateTask({ id: editingTask.id, data: formattedValues })
      );
      if (res.type.endsWith("fulfilled")) {
        message.success("Task updated");
        setIsModalOpen(false);
        setEditingTask(null);
        console.log("Payload: ", res.payload);
      }
    } else {
      const res = await dispatch(createTask(formattedValues));
      if (res.type.endsWith("fulfilled")) {
        message.success("Task created");
        setIsModalOpen(false);
        console.log("Task created", res.payload);
      }
    }
    form.resetFields();
  };

  // DELETE
  const confirmDelete = async () => {
    const res = await dispatch(deleteTask(deleteId));
    if (res.type.endsWith("fulfilled")) message.success("Task deleted");
    setDeleteId(null);
  };

  // UI COLORS
  const statusColors = {
    pending: " text-yellow-600",
    in_progress: " text-blue-600",
    completed: " text-green-600",
  };

  const filteredTasks = items.filter((task) => {
    const matchSearch = task.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = filterStatus ? task.status === filterStatus : true;
    const matchPriority = filterPriority
      ? task.priority === filterPriority
      : true;

    return matchSearch && matchStatus && matchPriority;
  });

  // TABLE COLUMNS
  const columns = [
    {
              title: "ID",
              dataIndex: "id",
              width: 10,
              sorter: (a, b) => a.id - b.id,
              border: true,
            },

    {
      title: "Title",
      dataIndex: "title",
      responsive: ["sm"],
      
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) =>
        text?.length > 40 ? text.slice(0, 40) + "..." : text,
    },
//     {
//   title: "Due Date",
//   dataIndex: "due_date",
//   render: (date) => (
//     <span className="font-semibold text-gray-700">
//       {date ? date : "N/A"}
//     </span>
//   )
// },
{
  title: "Due Date",
  dataIndex: "due_date",
  render: (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  },
}
,

    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (
        <span
          // className={` text-xs sm:text-sm font-semibold uppercase ${
          //   priority === "high"
          //     ? " text-red-600"
          //     : priority === "medium"
          //     ? " text-yellow-600"
          //     : " text-green-600"
          // }`}
          className="text-xs sm:text-sm uppercase"
        >
          {priority}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          // className={`text-xs sm:text-sm font-semibold uppercase ${statusColors[status]}`}
          className="text-xs sm:text-sm uppercase"
        >
          {status.replace("_", " ")}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-3">
                            <Tooltip title="Edit Task">
          
          <Button
            size="small"
            icon={<FaEdit />}
            onClick={() => openEditModal(record)}
            className="text-blue-600  border-blue-600 hover:!text-blue-400 hover:!border-blue-400"
          />
                  </Tooltip>
                  <Tooltip title="Delete Task">

          <Button
            size="small"
            danger
            icon={<FaTrash />}
            onClick={() => setDeleteId(record.id)}
          />
                            </Tooltip>
          
        </div>
      ),
    },
  ];

  // ROW HIGHLIGHT FOR HIGH PRIORITY
  // const rowClassName = (record) =>
  //   record.priority === "high" && record.status !== "completed"
  //     ? " text-black "
  //     : "";

  const rowClassName = (record) => {
  const today = new Date().toISOString().split("T")[0];

  if (record.due_date && record.due_date < today && record.status !== "completed") {
    return "bg-red-100 text-red-600 font-semibold";
  }
  return "";
};


 console.log("Filtered Tasks: ", filteredTasks);
  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-6 px-3 sm:px-0 space-y-4">

        {/* HEADER */}
        <Card className="shadow-lg rounded-2xl border-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
            <div className="flex items-center gap-3">
              <FaTasks className="text-3xl text-purple-800 mb-4" />
              <div>
                <h1 className="text-3xl font-bold text-purple-800">Tasks</h1>
                <p className="text-gray-700 mt-0">
                  Manage your tasks efficiently & stay productive
                </p>
              </div>
            </div>
                  <Tooltip title="Add Task">

            <Button
              type="primary"
              icon={<RiApps2AddLine />}
              onClick={openAddModal}
              className="rounded-md bg-gray-800 hover:!bg-gray-700  transition-all flex items-center gap-2 px-4 py-2"
            >
              Add Task
            </Button>
                              </Tooltip>

          </div>

          {/* FILTER BAR */}
          

<div className="mt-6 bg-[#FAF5FF] p-5 rounded-xl shadow-lg border border-gray-300">

  <div className="flex flex-col md:flex-row items-center gap-6">

    {/* SEARCH */}
    <div className="flex flex-row w-full md:w-1/3 gap-2">
      <label className="text-sm font-semibold text-purple-800 mb-1 flex items-center gap-2">
        <FaSearch className="text-gray-400" /> Search
      </label>
      <Input
        size="medium"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg shadow-sm"
      />
    </div>

    {/* STATUS */}
    <div className="flex flex-row w-full md:w-1/3 gap-2">
      <label className="text-sm font-semibold text-purple-800 mb-1 flex items-center gap-2">
        <FaFlag className="text-blue-400" /> Status
      </label>
      <Select
        size="medium"
        placeholder="Filter by Status"
        allowClear
        onChange={setFilterStatus}
        className="w-full"
        options={[
          { value: "pending",label: (
      <span className="flex items-center gap-2 text-yellow-600 font-semibold">
         <ClockCircleOutlined /> Pending
      </span>
    ), },
          { value: "in_progress", label: (
      <span className="flex items-center gap-2 text-blue-600 font-semibold">
                <SyncOutlined />

         In Progress
      </span>
    ), },
          { value: "completed",  label: (
      <span className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircleOutlined />

         Completed
      </span>
    ), },
        ]}
      />
    </div>

    {/* PRIORITY */}
    <div className="flex flex-row w-full md:w-1/3 gap-2">
      <label className=" font-semibold text-purple-800 mb-1 flex items-center gap-2">
        <FaBolt className="text-yellow-400" /> Priority
      </label>
      <Select
        size="medium"
        placeholder="Filter by Priority"
        allowClear
        onChange={setFilterPriority}
          className="
    w-full
    rounded-xl
    shadow-sm
  "
        // options={[
        //   { value: "low",  label: <span className="text-green-600 font-semibold">🟢 Low</span>, },
        //   { value: "medium", label: <span className="text-yellow-600 font-semibold">🟡 Medium</span>, },
        //   { value: "high", label: <span className="text-red-600 font-semibold">🔴 High</span>,},
        // ]}
        options={[
  {
    value: "low",
    label: (
      <span className="flex items-center gap-2 text-green-600 font-semibold">
        <ArrowDownOutlined />
        Low
      </span>
    ),
  },
  {
    value: "medium",
    label: (
      <span className="flex items-center gap-2 text-yellow-600 font-semibold">
        <PiArticleMediumLight />
        Medium
      </span>
    ),
  },
  {
    value: "high",
    label: (
      <span className="flex items-center gap-2 text-red-600 font-semibold">
        <ArrowUpOutlined />
        High
      </span>
    ),
  },
]}

      />
    </div>

  </div>
  
</div>



          {/* TABLE */}
          <div className="mt-6 overflow-x-auto custom-table-scrollbar">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={filteredTasks}
              loading={loading}
              rowClassName={rowClassName}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    showTotal: (total) => (
                      <p>
                        Total <span className="font-semibold">{total}</span>{" "}
                        tasks
                      </p>
                    ),
                    className: "mx-4 custom-pagination",
                    responsive: true,
                    onChange: () => {
                      window.scrollTo({ top: 250, behavior: "smooth" });
                    },
                  }}
                  // scroll={{ x: 'max-content' }}
                  className="custom-table"
                  components={{
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          style={{
                            backgroundColor: "#0E7490",
                            color: "white",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        />
                      ),
                    },
                    
                  }}
            />
          </div>
        </Card>
      </div>

      {/* ---------------- MODALS ---------------- */}

      <Modal
        title={<span className="text-2xl flex justify-center font-bold text-purple-800">
           {editingTask ? "Edit Task" : "Add Task"} </span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText={editingTask ? "Update" : "Create"}
        onOk={() => form.submit()}
          okButtonProps={{
    className:
      "bg-purple-800 hover:!bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg",
  }}
  cancelButtonProps={{
    className:
      "border border-gray-400 text-gray-600 hover:bg-gray-100 rounded-lg",
  }}
        className="rounded-xl "
        centered
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input size="large" placeholder="Task title" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input size="large" placeholder="Short description" />
          </Form.Item>
          <Form.Item label="Due Date" name="due_date">
         <DatePicker className="w-full" format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item label="Priority" name="priority" rules={[{ required: true }]}>
            <Select
              size="large"
              placeholder="Select priority"
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select
              size="large"
              placeholder="Select status"
              options={[
                { value: "pending", label: "Pending" },
                { value: "in_progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      {/* <Modal
         title={<span className="text-2xl flex justify-center font-bold text-purple-800">
           {"Delete Task"}</span>}
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        onOk={confirmDelete}
        centered
      >
        <p className="">Are you sure you want to delete this task?</p>
      </Modal> */}
      {/* DELETE CONFIRMATION */}
<Modal
  open={!!deleteId}
  onCancel={() => setDeleteId(null)}
  onOk={confirmDelete}
  centered
  footer={null}
  width={420}
  bodyStyle={{ padding: 0 }}
>
  {/* Header */}
  <div className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-800 text-white rounded-t-xl mt-4">
    <h2 className="text-xl font-bold text-center">
      Delete Task
    </h2>
    <p className="text-xs text-center text-white/80 mt-1">
      This action cannot be undone
    </p>
  </div>

  {/* Body */}
  <div className="px-6 py-6 text-center">
    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
      <span className="text-3xl">🗑️</span>
    </div>

    <p className="text-gray-700 font-medium">
      Are you sure you want to delete this task?
    </p>

    <p className="text-sm text-gray-400 mt-1">
      Once deleted, this task cannot be recovered.
    </p>
  </div>

  {/* Footer */}
  <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
    <button
      onClick={() => setDeleteId(null)}
      className="
        px-4 py-2 rounded-lg
        text-gray-700 bg-white
        border border-gray-300
        hover:bg-gray-100
        transition
      "
    >
      Cancel
    </button>

    <button
      onClick={confirmDelete}
      className="
        px-4 py-2 rounded-lg
        bg-red-600 text-white
        hover:bg-red-700
        transition
        shadow-md
      "
    >
      Delete Task
    </button>
  </div>
</Modal>

    </Layout>
  );
}
