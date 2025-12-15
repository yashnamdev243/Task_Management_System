import { useCallback, useEffect, useState } from "react";
import {
  Table,
  Select,
  Button,
  Tag,
  Popconfirm,
  message,
  Card,
  Tooltip,
} from "antd";
import {
  ReloadOutlined,
  DeleteOutlined,
  FilterOutlined,
  UserOutlined,
  CalendarOutlined,
  FlagOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import api from "../api/axios";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";

const { Option } = Select;

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    user_id: "",
    priority: "",
    status: "",
    overdue: "",
  });

  // Load Users
  const loadUsers = () => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  };

  // Load Tasks
  const loadTasks = useCallback(() => {
    api.get("/admin/tasks", { params: filters }).then((res) => {
      console.log("BACKEND RESPONSE TASKS:", res.data);

      setTasks(res.data);
    });
  }, [filters]);

  //   useEffect(() => {
  //     loadUsers();
  //     loadTasks();
  //   }, []);
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  // Filter Change
  const handleFilterChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    loadTasks(updated);
  };

  // Delete Task
  const deleteTask = (id) => {
    api.delete(`/admin/tasks/${id}`).then(() => {
      message.success("Task deleted successfully");
      loadTasks();
    });
  };

  // COLOR SYSTEM
  const priorityMap = {
    high: "bg-red-100 text-red-600 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-blue-100 text-blue-700 border-blue-300",
  };

  const statusMap = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    in_progress: "bg-blue-100 text-blue-700 border-blue-300",
    completed: "bg-green-100 text-green-700 border-green-300",
  };
  console.log("tasks", tasks);
  return (
    <div className="p-4 md:p-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Task Management
      </h1>

      {/* FILTER BAR */}
      <Card className="mb-6 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-xl bg-white/60">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
            <FilterOutlined /> Filters
          </span>

          {/* USER */}
          <Select
            placeholder="Filter by User"
            style={{ width: 180 }}
            allowClear
            onChange={(v) => handleFilterChange("user_id", v || "")}
          >
            {users.map((u) => (
              <Option key={u.id} value={u.id}>
                {u.name}
              </Option>
            ))}
          </Select>

    

          {/* OVERDUE */}
          <Select
            placeholder="Overdue?"
            style={{ width: 150 }}
            allowClear
            onChange={(v) => handleFilterChange("overdue", v || "")}
          >
            <Option value="true">Overdue Only</Option>
          </Select>

          {/* REFRESH */}
          <Tooltip title="Reload Tasks">
          <Button
            icon={<ReloadOutlined />}
           
                className="rounded-md bg-blue-500 text-white hover:!text-blue-500 hover:!border-blue-500"
            onClick={() => {
              setFilters({
                user_id: "",
                priority: "",
                status: "",
                overdue: "",
              });
            }}
          >
            Reset Filters
          </Button>
            </Tooltip>
        </div>
      </Card>

      {/* TABLE */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <Table
          rowKey="id"
          dataSource={tasks}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => (
              <p >
                Total <span className="font-semibold ">{total}</span> Tasks
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
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              width: 10,
              sorter: (a, b) => a.id - b.id,
              border: true,
            },

            {
              title: "Task",
              render: (row) => (
                <div className="font-semibold text-gray-800 text-md">
                  {row.title}
                </div>
              ),
            },
            {
              title: "Description",
              render: (row) => (
                <div className="text-gray-700 text-sm">
                  {row.description?.slice(0, 60)}...
                </div>
              ),
            },

            {
              title: "User",
              render: (row) => (
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">
                    {row.user_name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {row.user_email}
                  </span>
                </div>
              ),
            },

            {
              title: "Due Date",
              dataIndex: "due_date",
              render: (date) => {
                if (!date) return "N/A";
                const d = new Date(date);
                return (
                  <span className="flex items-center gap-2">
                    <CalendarOutlined className="text-gray-500" />
                    {d.toLocaleDateString("en-IN")}
                  </span>
                );
              },
            },

            {
              title: "Priority",
              dataIndex: "priority",
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
                <div className="p-4 w-40 flex flex-col gap-2 shadow-lg rounded-xl bg-white border border-gray-200">
                  <div className="text-gray-700 font-semibold text-sm">
                    Select Priority
                  </div>

                  <Select
                    value={selectedKeys[0]}
                    className="w-full"
                    placeholder="Choose Priority"
                    dropdownStyle={{ borderRadius: "10px" }}
                    // onChange={(val) => setSelectedKeys(val ? [val] : [])}
                    onChange={(val) => {
                      setSelectedKeys(val ? [val] : []);
                      handleFilterChange("priority", val || "");
                    }}
                  >
                    <Option value="low">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        Low
                      </span>
                    </Option>

                    <Option value="medium">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        Medium
                      </span>
                    </Option>

                    <Option value="high">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        High
                      </span>
                    </Option>
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
                </div>
              ),

              // Actual filtering
              //   onFilter: (value, record) => record.priority === value,

              // Priority badge render
              render: (p) => (
                <div
                  className={`px-2 py-1 rounded-md text-xs font-semibold  w-18 border mx-auto text-center ${priorityMap[p]}`}
                >
                  {p.toUpperCase()}
                </div>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
              width: 150,
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
                <div className="p-4 w-40 flex flex-col gap-2  shadow-lg rounded-xl bg-white border border-gray-200">
                  <div className="text-gray-700 font-semibold text-sm">
                    Select Status
                  </div>

                  <Select
                    value={selectedKeys[0]}
                    className="w-full"
                    placeholder="Choose Status"
                    dropdownStyle={{ borderRadius: "10px" }}
                    // onChange={(val) => setSelectedKeys(val ? [val] : [])}
                    onChange={(val) => {
                      setSelectedKeys(val ? [val] : []);
                      handleFilterChange("status", val || "");
                    }}
                  >
                    <Option value="pending">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        Pending
                      </span>
                    </Option>

                    <Option value="in_progress">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        In Progress
                      </span>
                    </Option>

                    <Option value="completed">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Completed
                      </span>
                    </Option>
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
                </div>
              ),

              // Table Filtering Logic
              //   onFilter: (value, record) => record.status === value,

              // Beautiful Badge Render
              render: (s) => (
                <div
                  className={`px-1 py-1 rounded-md text-xs font-semibold w-21 mx-auto text-center border ${statusMap[s]}`}
                >
                  {s.replace("_", " ").toUpperCase()}
                </div>
              ),
            },
            {
              title: "Actions",
              render: (row) => (
                <Popconfirm
                  title="Delete task?"
                  onConfirm={() => deleteTask(row.id)}
                >
                  <Tooltip title="Delete Task">
                    <Button
                      icon={<MdOutlineDeleteSweep className="text-lg mt-1" />}
                                         className="rounded-md bg-red-500 text-white hover:!text-red-500 hover:!border-red-500"
                                       >
                    
                      Delete
                    </Button>
                  </Tooltip>
                </Popconfirm>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
