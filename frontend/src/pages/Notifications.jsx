import Layout from "../components/Layout";
import { Card, Tag, Empty } from "antd";
import { useSelector } from "react-redux";
import {
  FaBell,
  FaHourglassHalf,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

export default function Notifications() {
  const { items } = useSelector((state) => state.tasks);

  const pending = items.filter((t) => t.status === "pending");
  const inProgress = items.filter((t) => t.status === "in_progress");
  const completed = items.filter((t) => t.status === "completed");

  const Section = ({ title, icon, color, data }) => (
    <Card className="rounded-2xl shadow-md mb-6">
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${color}`}>
        {icon} {title}
        <span className="ml-auto text-sm bg-gray-100 px-3 py-1 rounded-full">
          {data.length}
        </span>
      </h2>

      {data.length === 0 ? (
        <Empty description="No tasks here" />
      ) : (
        <ul className="space-y-3 h-4overflow-y-auto custom-scrollbar2">
          {data.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="pl-3 w-full ">
                <h3 className="font-semibold text-gray-800">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500">
                    {task.description}
                  </p>
                )}
              </div>

              <Tag
                color={
                  task.status === "pending"
                    ? "orange"
                    : task.status === "in_progress"
                    ? "blue"
                    : "green"
                }
                className="px-3 py-1 font-semibold rounded-lg"
              >
                {task.status.replace("_", " ").toUpperCase()}
              </Tag>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto ">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaBell className="text-3xl text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Notifications
            </h1>
            <p className="text-gray-500">
              Overview of your task updates
            </p>
          </div>
        </div>

        {/* Sections */}
        <Section
          title="Pending Tasks"
          icon={<FaHourglassHalf />}
          color="text-yellow-600"
          data={pending}
        />

        <Section
          title="In Progress Tasks"
          icon={<FaSpinner className="animate-spin-slow" />}
          color="text-blue-600"
          data={inProgress}
        />

        <Section
          title="Completed Tasks"
          icon={<FaCheckCircle />}
          color="text-green-600"
          data={completed}
        />
      </div>
    </Layout>
  );
}
