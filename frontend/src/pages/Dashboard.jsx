import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Avatar, Button, Card, Progress, Modal } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  BellOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { BiSolidDashboard } from "react-icons/bi";
import { RiApps2AddLine } from "react-icons/ri";
import { FaBolt, FaCheckCircle, FaExclamationTriangle, FaRocket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLoginFlag } from "../features/auth/authSlice";
import { motion } from "framer-motion";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.tasks);
  const { justLoggedIn } = useSelector((state) => state.auth);

  const total = items.length;
  const pendingTasks = items.filter((t) => t.status === "pending");
  const inProgressTasks = items.filter((t) => t.status === "in_progress");
  const completedTasks = items.filter((t) => t.status === "completed");

  const pending = pendingTasks.length;
  const inProgress = inProgressTasks.length;
  const completed = completedTasks.length;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("summary"); // summary | pending | progress
  const shownRef = useRef(false);
  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!justLoggedIn) return;
    if (shownRef.current) return;

    shownRef.current = true;

    if (pending === 0 && inProgress === 0) {
      dispatch(clearLoginFlag());
      return;
    }

    setOpen(true);
    dispatch(clearLoginFlag());
  }, [justLoggedIn]);

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: <AppstoreOutlined />,
      gradient: "from-blue-500 to-cyan-400",
      ring: "ring-blue-200",
      hint: "All created tasks",
    },
    {
      title: "Pending",
      value: pending,
      icon: <ClockCircleOutlined />,
      gradient: "from-yellow-400 to-orange-400",
      ring: "ring-yellow-200",
      hint: "Needs attention",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: <SyncOutlined />,
      gradient: "from-purple-500 to-indigo-400",
      ring: "ring-purple-200",
      hint: "Ongoing work",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircleOutlined />,
      gradient: "from-green-500 to-emerald-400",
      ring: "ring-green-200",
      hint: "Successfully finished",
    },
  ];
  const progressPercent =
    total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <Layout>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setView("summary");
        }}
        footer={null}
        centered
        width={540}
        className="rounded-2xl overflow-hidden"
        bodyStyle={{ padding: 8 }}
      >
        {/* GLASS HEADER */}
        <div className="relative px-5 py-4 backdrop-blur-xl bg-gradient-to-r from-blue-500/90 to-purple-400/90 text-white rounded-t-2xl shadow-lg border-b border-white/20 z-10">
          <div className="flex items-center gap-3">
            {view !== "summary" && (
              <ArrowLeftOutlined
                onClick={() => setView("summary")}
                className="cursor-pointer text-white/80 hover:text-white"
              />
            )}

            <div className="relative">
              <Avatar
                size={44}
                icon={<BellOutlined />}
                className="bg-white text-purple-500 shadow-xl"
              />
              <span className="absolute bottom-0 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-wide">
                Task Reminder
              </h2>
              <p className="text-xs text-white/80">
                {view === "summary"
                  ? "Your focus items for today"
                  : view === "pending"
                  ? "Pending tasks"
                  : "Work in progress"}
              </p>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        </div>

        {/* BODY */}
        <div className="px-5 py-5 bg-[#fafafa] space-y-4 max-h-[340px] overflow-y-auto custom-scrollbar2">
          {/* SUMMARY */}
          {view === "summary" && (
            <>
              {pending > 0 && (
                <div
                  onClick={() => setView("pending")}
                  className="group flex items-center justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer border-l-4 border-yellow-400"
                >
                  <div className="flex items-center gap-3">
                    <ClockCircleOutlined
                      spin
                      className="text-yellow-500 text-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Pending Tasks</p>
                      <p className="text-xs text-gray-400">Needs attention</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                    {pending}
                  </span>
                </div>
              )}

              {inProgress > 0 && (
                <div
                  onClick={() => setView("progress")}
                  className="group flex items-center justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-3">
                    <SyncOutlined spin className="text-blue-500 text-lg" />
                    <div>
                      <p className="font-medium text-gray-800">In Progress</p>
                      <p className="text-xs text-gray-400">Ongoing work</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {inProgress}
                  </span>
                </div>
              )}

              <p className="text-xs text-center text-gray-400 mt-3">
                Select a category to deep-focus ⚡
              </p>
            </>
          )}

          {/* PENDING TASKS */}
          {view === "pending" &&
            pendingTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  setOpen(false);
                  navigate(`/tasks?id=${task.id}`);
                }}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow transition cursor-pointer"
              >
                <p className="font-medium text-gray-800 truncate">
                  {task.title}
                </p>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span className="text-yellow-600">Pending</span>
                  {/* <span>{task.due_date || "No deadline"}</span> */}
                  <span className="flex items-center gap-1 text-xs text-yellow-600">
                    <ClockCircleOutlined className="text-yellow-600" />
                    {formatDate(task.due_date || "No deadline")}
                  </span>
                </div>
              </div>
            ))}

          {/* IN PROGRESS TASKS */}
          {view === "progress" &&
            inProgressTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  setOpen(false);
                  navigate(`/tasks?id=${task.id}`);
                }}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow transition cursor-pointer"
              >
                <p className="font-medium text-gray-800 truncate">
                  {task.title}
                </p>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span className="text-blue-600">In Progress</span>
                  {/* <span>{task.due_date || "No deadline"}</span> */}
                  <span className="flex items-center gap-1 text-xs text-blue-600">
                    <SyncOutlined className="text-blue-600" />
                    {formatDate(task.due_date || "No deadline")}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t bg-white flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Stay consistent. Small wins matter.
          </p>

          <Button
            type="primary"
            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-400 border-0 shadow hover:!bg-gradient-to-r hover:from-blue-600 hover:to-purple-500 flex items-center gap-2"
            onClick={() => {
              setOpen(false);
              navigate("/tasks");
            }}
          >
            Open Tasks
          </Button>
        </div>
      </Modal>

      <Card
        className="mt-6 shadow-xl rounded-2xl border-0"
        bodyStyle={{ padding: 30 }}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-3">
            <BiSolidDashboard className="text-3xl text-purple-800 mb-4" />
            <div>
              <h1 className="text-3xl font-bold text-purple-800">Dashboard</h1>
              <p className="text-gray-700">Task performance overview</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="primary"
              icon={<RiApps2AddLine />}
              onClick={() => navigate("/tasks")}
              className="bg-gray-800 hover:!bg-gray-700 border-0 flex items-center gap-2"
            >
              Add Task
            </Button>

            <Button
              type="primary"
              icon={<CalendarOutlined />}
              onClick={() => navigate("/calendar")}
              className="bg-[#A87DD9] hover:!bg-[#b68be8] border-0 flex items-center gap-2"
            >
              Calendar
            </Button>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="
        relative overflow-hidden rounded-2xl
        bg-white/70 backdrop-blur-xl
        shadow-lg hover:shadow-2xl
        border border-white/60
        p-5
      "
            >
              {/* Gradient Accent */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}
              />

              {/* Icon */}
              <div
                className={`
          w-12 h-12 flex items-center justify-center
          rounded-xl bg-gradient-to-br ${item.gradient}
          text-white text-xl
          ring-4 ${item.ring}
          shadow-md
        `}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {item.title}
                </p>

                <div className="flex items-end justify-between mt-1">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {item.value}
                  </h2>

                  <span className="text-xs text-gray-400">{item.hint}</span>
                </div>
              </div>

              {/* Glow */}
              <div
                className={`absolute -bottom-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${item.gradient}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress */}

        <div
          className="
    mt-12 rounded-2xl
    bg-white/70 backdrop-blur-xl
    shadow-lg border border-white/60
    p-6
  "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-800">
              Overall Progress
            </h2>

            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-gray-500"
            >
              {completed} / {total} completed
            </motion.span>
          </div>

          {/* Progress Bar */}a
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Progress
              percent={progressPercent}
              showInfo={false}
              strokeColor={{
                "0%": "#2660d4", // purple
                "100%": "#22c55e", // green
              }}
              trailColor="#e5e7eb"
              strokeWidth={14}
              status="active"
            />
          </motion.div>

          {/* Percentage + Status */}
          <div className="flex items-center justify-between mt-4">
            {/* Percentage */}
            <motion.div
              key={progressPercent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xl font-bold text-gray-800"
            >
              {progressPercent}%
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-semibold
        ${
          completed === total && total > 0
            ? "bg-green-100 text-green-700"
            : completed > total / 2
            ? "bg-blue-100 text-blue-700"
            : "bg-red-100 text-red-700"
        }
      `}
            >
              {completed === total && total > 0 ? (
                <>
                  <FaCheckCircle /> EXCELLENT
                </>
              ) : completed > total / 2 ? (
                <>
                  <FaRocket /> GOOD PROGRESS
                </>
              ) : (
                <>
                  <FaExclamationTriangle /> NEEDS FOCUS
                </>
              )}
            </motion.div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
