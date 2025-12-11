
// import { Card, Row, Col, Statistic, Table } from "antd";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTasks: 0,
//     highPriority: 0,
//     overdue: 0  
//   });

//   const [recentUsers, setRecentUsers] = useState([]);
//   const [recentTasks, setRecentTasks] = useState([]);

//   useEffect(() => {
//     api.get("/admin/stats").then((res) => setStats(res.data));
//     console.log("STATS FETCHED, DATA:", stats);
//     api.get("/admin/recent-users").then((res) => setRecentUsers(res.data));
//     api.get("/admin/recent-tasks").then((res) => setRecentTasks(res.data));
//   }, []);
// //   console.log("STATS:", stats);
//   return (
//     <div>
//       <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

//       {/* STATS CARDS */}
//       <Row gutter={16}>
//         <Col span={6}>
//           <Card className="shadow-md">
//             <Statistic title="Total Users" value={stats.totalUsers} />
//           </Card>
//         </Col>

//         <Col span={6}>
//           <Card className="shadow-md">
//             <Statistic title="Total Tasks" value={stats.totalTasks} />
//           </Card>
//         </Col>

//         <Col span={6}>
//           <Card className="shadow-md">
//             <Statistic
//               title="High Priority Tasks"
//               value={stats.highPriority}
//               valueStyle={{ color: "red" }}
//             />
//           </Card>
//         </Col>

//         <Col span={6}>
//           <Card className="shadow-md">
//             <Statistic
//               title="Overdue Tasks"
//               value={stats.overdue}
//               valueStyle={{ color: "orange" }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* RECENT USERS & TASKS */}
//       <Row className="mt-6" gutter={16}>
//         <Col span={12}>
//           <Card title="Recently Added Users" className="shadow-md">
//             <Table
//               rowKey="id"
//               dataSource={recentUsers}
//               pagination={false}
//               columns={[
//                 { title: "Name", dataIndex: "name" },
//                 { title: "Email", dataIndex: "email" },
//                 { title: "Role", dataIndex: "role" }
//               ]}
//             />
//           </Card>
//         </Col>

//         <Col span={12}>
//           <Card title="Recently Added Tasks" className="shadow-md">
//             <Table
//               rowKey="id"
//               dataSource={recentTasks}
//               pagination={false}
//               columns={[
//                 { title: "Title", dataIndex: "title" },
//                 { title: "User", dataIndex: "user_name" },
//                 { title: "Priority", dataIndex: "priority" },
//                 { title: "Status", dataIndex: "status" }
//               ]}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }




import { Card, Row, Col, Statistic, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { FaFileCirclePlus } from "react-icons/fa6";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    highPriority: 0,
    overdue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
    api.get("/admin/recent-users").then((res) => setRecentUsers(res.data));
    api.get("/admin/recent-tasks").then((res) => setRecentTasks(res.data));
  }, []);
const formatStatus = (status) => {
  return status.replace(/_/g, " ").toUpperCase();
};

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADING */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Admin Dashboard
      </h1>

      {/* === STAT CARDS === */}
      <Row gutter={[20, 20]}>
        {[
          {
            label: "Total Users",
            value: stats.totalUsers,
            gradient: "from-blue-500 to-blue-600",
          },
          {
            label: "Total Tasks",
            value: stats.totalTasks,
            gradient: "from-violet-500 to-violet-600",
          },
          {
            label: "High Priority Tasks",
            value: stats.highPriority,
            gradient: "from-red-500 to-red-600",
          },
          {
            label: "Overdue Tasks",
            value: stats.overdue,
            gradient: "from-orange-500 to-orange-600",
          },
        ].map((i, x) => (
          <Col xs={24} sm={12} md={6} key={x}>
            <Card
              bordered={false}
              className={`rounded-2xl shadow-xl text-white bg-gradient-to-r ${i.gradient} transform hover:-translate-y-1 transition`}
            >
              <Statistic
                title={<span className="text-gray-100  flex justify-center font-bold text-lg">{i.label}</span>}
                value={i.value}
                
                 valueStyle={{
      color: "white",
      fontSize: "28px",
      fontWeight: "700",
      textAlign: "center",
    }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* USERS + TASKS SECTION */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* === USERS SECTION (PROFILE STYLE CARDS) === */}
        <div>
  <div className="mb-4">
  <div className="flex items-center gap-2">
    <PiUserCirclePlusDuotone className="text-3xl text-indigo-600" />

    <h2 className="text-xl font-semibold text-gray-700">
      Recently Added Users
    </h2>
  </div>
</div>

          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </div>

              <div
  className={`text-sm px-3 py-1 rounded-full font-semibold w-20 text-center ${
    user.role === "admin"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {user.role.toUpperCase()}
</div>

              </div>
            ))}
          </div>
        </div>

        {/* === TASK CARDS SECTION (MODERN TASK CARDS) === */}
        <div>
       
 <div className="mb-4">
  <div className="flex items-center gap-2">
    <FaFileCirclePlus className="text-2xl text-indigo-600" />

    <h2 className="text-xl font-semibold text-gray-700">
      Recently Added Tasks
    </h2>
  </div>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTasks.map((task) => {
              const priorityColors = {
                High: "bg-red-500",
                Medium: "bg-orange-500",
                Low: "bg-blue-500",
              };

              return (
                <div
                  key={task.id}
                  className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition relative overflow-hidden"
                >
                  {/* Priority Color Bar */}
                  <div className={`absolute top-0 left-0 w-full h-2 ${priorityColors[task.priority]}`} />
 <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-tr-xl border-4 border-indigo-200  mb-4 text-lg font-bold">
                    {task.title?.charAt(0)}
                  </div>
                                    <div>

                  <p className="text-lg font-semibold text-gray-800 ">{task.title}</p>

                  <p className="text-sm text-gray-500 ">Assigned to: {task.user_name}</p>
  </div>
    </div>
                  
                  <div className="flex justify-between items-center mt-3">

<div
  style={{
    backgroundColor:
      task.priority.toLowerCase() === "high"
        ? "#fee2e2" // light red
        : task.priority.toLowerCase() === "medium"
        ? "#ffedd5" // light orange
        : "#dbeafe", // light blue (low)
    color:
      task.priority.toLowerCase() === "high"
        ? "#b91c1c"
        : task.priority.toLowerCase() === "medium"
        ? "#c2410c"
        : "#1e3a8a",
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: "600",
    display: "inline-block",
    minWidth: "60px",
    textAlign: "center",
  }}
>
  {task.priority.toUpperCase()}
</div>

<div
  style={{
    backgroundColor:
      task.status.toLowerCase() === "completed"
        ? "#dcfce7" // green
        : task.status.toLowerCase() === "in_progress"
        ? "#dbeafe" // blue
        : "#fef9c3", // yellow (pending)
    color:
      task.status.toLowerCase() === "completed"
        ? "#166534"
        : task.status.toLowerCase() === "in_progress"
        ? "#1e3a8a"
        : "#854d0e",
    padding: "4px 12px",
    borderRadius: "6px",
    fontWeight: "600",
    display: "inline-block",
    minWidth: "100px",
    textAlign: "center",
  }}
>
  {formatStatus(task.status)}
</div>

</div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
