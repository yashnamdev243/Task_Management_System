import Layout from "../components/Layout";
import { Button, Card, Progress } from "antd";
import { useSelector } from "react-redux";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { BiSolidDashboard } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { RiApps2AddLine } from "react-icons/ri";
import { FaBolt, FaExclamationTriangle } from "react-icons/fa";

export default function Dashboard() {
  const { items } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  
  // Status counts
  const total = items.length;
  const pending = items.filter(t => t.status === "pending").length;
  const inProgress = items.filter(t => t.status === "in_progress").length;
  const completed = items.filter(t => t.status === "completed").length;

  // Priority counts
  const low = items.filter(t => t.priority === "low").length;
  const medium = items.filter(t => t.priority === "medium").length;
  const high = items.filter(t => t.priority === "high").length;

  const stats = [
    {
      title: <span className="text-blue-700"> Total Tasks</span>,
      value: total,
      icon: <AppstoreOutlined className="text-2xl text-blue-700" />,
      bg: "bg-blue-50",
    },
    {
      title: <span className="text-yellow-700">Pending</span>,
      value: pending,
      icon: <ClockCircleOutlined className="text-2xl text-yellow-700" />,
      bg: "bg-yellow-50",
    },
    {
      title: <span className="text-purple-700">In Progress</span>,
      value: inProgress,
      icon: <SyncOutlined className="text-2xl text-purple-700" />,
      bg: "bg-purple-50",
    },
    {
      title: <span className="text-green-700">Completed</span>,
      value: completed,
      icon: <CheckCircleOutlined className="text-2xl text-green-700" />,
      bg: "bg-green-50",
    },
  ];
// 📅 Today, Week & Due Date Calculations
const today = new Date().toISOString().split("T")[0];

const dueToday = items.filter(
  (t) => t.due_date === today
).length;

const overdue = items.filter(
  (t) =>
    t.due_date &&
    t.due_date < today &&
    t.status !== "completed"
).length;

const next7Days = items.filter((t) => {
  if (!t.due_date) return false;
  const diff =
    (new Date(t.due_date) - new Date(today)) /
    (1000 * 60 * 60 * 24);
  return diff > 0 && diff <= 7;
}).length;

const noDueDate = items.filter((t) => !t.due_date).length;
// Sort Tasks By Due Date (Nearest First)
const upcomingDeadlines = [...items]
  .filter(t => t.due_date && t.status !== "completed")
  .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
  .slice(0, 5);

  return (
    <Layout>
       <Card
        className="
          max-w-auto mx-auto mt-6 shadow-xl border-0 rounded-2xl 
          hover:shadow-2xl transition-all duration-300
        "
        bodyStyle={{ padding: "30px" }}
      >
              {/* <h1 className="text-3xl font-bold">Dashboard</h1> */}
                        {/* Quick Actions */}
         
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        
                 <div className="flex items-center gap-3">
                              <BiSolidDashboard className="text-3xl text-cyan-800 mb-4" />
                              <div>
                                <h1 className="text-3xl font-bold text-cyan-800">Dashboard</h1>
                                <p className="text-cyan-700 mt-0">
                            Overview of your task management performance.
                          </p>
                              </div>
                            </div>
                             <div className="flex gap-3 mt-3 overflow-y-auto custom-scrollbar">
           
             <Button
              type="primary"
              icon={<RiApps2AddLine />}
              onClick={() => navigate("/tasks")}
              className="rounded-md bg-cyan-600 hover:!bg-cyan-700 transition-all flex items-center gap-2 px-4 py-2"
            >
              Add Task
            </Button>
            <Button
             type="primary"
              icon={<AppstoreOutlined />}
              onClick={() => navigate("/kanban")}
              className="rounded-md bg-sky-600 hover:!bg-sky-700 transition-all flex items-center gap-2 px-4 py-2 "
            >
              Kanban View
            </Button>
    
            <Button
             type="primary"
              icon={<CalendarOutlined />}
              onClick={() => navigate("/calendar")}
              className="rounded-md bg-green-600 hover:!bg-green-700 transition-all flex items-center gap-2 px-4 py-2"
            >
              Calendar View
            </Button>
          </div>
                            </div>
        

     {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((item, index) => (
          <Card
            key={index}
            className={`shadow-lg rounded-2xl border-0 hover:shadow-2xl transition-all duration-300 ${item.bg}`}
            bodyStyle={{ padding: "25px" }}
          >
            <div className="flex justify-between items-center">
              <div>
                 <span className="opacity-80 font-medium text-lg ">
                {item.icon} {item.title}
              </span>
                {/* <p className="text-gray-600 "></p> */}
                <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
              </div>
             
            </div>
          </Card>
        ))}
      </div>
{/* 📅 Due Date Summary Section */}
<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <Card className="rounded-2xl shadow-lg border-l-4 border-blue-500 ">
    <h2 className="text-lg font-semibold text-blue-700">Due Today</h2>
    <p className="text-xl font-bold mt-2">{dueToday}</p>
    <p className="text-gray-500 mt-1">Tasks due by end of day</p>
  </Card>

  <Card className="rounded-2xl shadow-lg border-l-4 border-red-500">
    <h2 className="text-lg font-semibold text-red-700">Overdue</h2>
    <p className="text-xl font-bold mt-2">{overdue}</p>
    <p className="text-gray-500 mt-1">Tasks past deadline</p>
  </Card>

  <Card className="rounded-2xl shadow-lg border-l-4 border-yellow-500">
    <h2 className="text-lg font-semibold text-yellow-700">Next 7 Days</h2>
    <p className="text-xl font-bold mt-2">{next7Days}</p>
    <p className="text-gray-500 mt-1">Due within a week</p>
  </Card>

  <Card className="rounded-2xl shadow-lg border-l-4 border-gray-500 ">
    <h2 className="text-lg font-semibold text-gray-700">No Due Date</h2>
    <p className="text-xl font-bold mt-2">{noDueDate}</p>
    <p className="text-gray-500 mt-1">Tasks without deadline</p>
  </Card>

</div>
{/* ⏳ Upcoming Deadlines Table */}
<div className="mt-10 bg-white p-5 rounded-2xl shadow border border-gray-200">
  <h2 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
    <FaBolt className="text-yellow-500" /> Upcoming Deadlines
  </h2>

  {upcomingDeadlines.length === 0 ? (
    <p className="text-gray-500 text-center py-4">No upcoming deadlines </p>
  ) : (
    <ul className="space-y-3">
      {upcomingDeadlines.map((task) => (
        <li
          key={task.id}
          className="flex justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 cursor-pointer"
        >
          <span className="font-semibold">{task.title}</span>

          <span className="text-sm font-bold text-cyan-700">
            {new Date(task.due_date).toLocaleDateString("en-GB")}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

   {/* Overall Progress */}
  <div className="mt-10 bg-white p-6 rounded-2xl shadow">
  <h2 className="text-xl font-bold mb-4 text-cyan-800">Overall Progress</h2>

  <Progress
    percent={total === 0 ? 0 : Math.round((completed / total) * 100)}
    status="active"
    strokeColor="#22c55e"
    className="text-lg"
  />
   {/* Performance Badge */}
          <div className="text-center mt-3 text-xl font-bold">
            {completed === total && total > 0 ? (
              <span className="text-green-600">EXCELLENT 🎯</span>
            ) : completed > total / 2 ? (
              <span className="text-blue-600">GOOD 💡</span>
            ) : (
<span className="text-red-600 justify-center flex  gap-1 font-semibold">
  <FaExclamationTriangle className="text-red-600 mt-1" />
  NEEDS IMPROVEMENT
</span>
            )}
          </div>
</div>
 {/* Priority Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card className="shadow rounded-xl bg-green-100">
            <h2 className="text-lg font-semibold text-green-700">LOW PRIORITY</h2>
            <p className="text-xl font-bold mt-2">{low}</p>
          </Card>

          <Card className="shadow rounded-xl bg-yellow-100">
            <h2 className="text-lg font-semibold text-yellow-700">MEDIUM PRIORITY</h2>
            <p className="text-xl font-bold mt-2">{medium}</p>
          </Card>

          <Card className="shadow rounded-xl bg-red-100">
            <h2 className="text-lg font-semibold text-red-700">HIGH PRIORITY</h2>
            <p className="text-xl font-bold mt-2">{high}</p>
          </Card>
        </div>
<div className="mt-10 bg-white p-6 rounded-2xl shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-cyan-800">Recent Tasks</h2>

    <button
      className="text-blue-600 hover:underline"
      onClick={() => navigate("/tasks")}
    >
      View All
    </button>
  </div>

  <ul className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
    {items.slice(0, 10).map((task) => (
      <li
        key={task.id}
        onClick={() => navigate(`/tasks?id=${task.id}`)}
        className="
          flex justify-between bg-gray-100 p-3 rounded-lg 
          hover:bg-gray-200 transition cursor-pointer
        "
      >
        <span className="font-medium">{task.title}</span>

        <span
          className={`px-3 py-1 rounded-lg text-sm font-semibold uppercase ${
            task.status === "completed"
              ? "bg-green-200 text-green-700"
              : task.status === "in_progress"
              ? "bg-blue-200 text-blue-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </li>
    ))}
  </ul>
</div>
        {/* Upcoming Tasks */}
        {/* <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>

          <ul className="space-y-3 ">
            {items
              .filter(t => t.status !== "completed")
              .slice(0, 5)
              .map((task) => (
                <li
                  key={task.id}
                  onClick={() => navigate(`/tasks?id=${task.id}`)}
                  className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                >
                  {task.title}
                </li>
              ))}
          </ul>
        </div> */}



      </Card>
    </Layout>
  );
}
