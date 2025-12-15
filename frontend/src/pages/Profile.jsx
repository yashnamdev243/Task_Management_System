
// import Layout from "../components/Layout";
// import { Card } from "antd";
// import { useSelector } from "react-redux";
// import { UserOutlined, MailOutlined } from "@ant-design/icons";
// import { BsPersonVcardFill } from "react-icons/bs";

// export default function Profile() {
//   const { user } = useSelector(state => state.auth);

//   return (
//     <Layout>
//       <Card
//         className="
//           max-w-full mx-auto mt-6 shadow-xl border-0 rounded-2xl 
//           hover:shadow-2xl transition-all duration-300
//         "
//         bodyStyle={{ padding: "30px" }}
//       >
//         {/* Title */}
//         {/* <div className="flex items-center justify-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
//             Your Profile
//           </h1>
//         </div> */}
//          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        
//                  <div className="flex items-center gap-3">
//                               <BsPersonVcardFill className="text-3xl text-purple-800 mb-4" />
//                               <div>
//                                 <h1 className="text-3xl font-bold text-purple-800">Your Profile</h1>
//                                 <p className="text-gray-700 mt-0">
//                             Manage your personal information and account settings.
//                           </p>
//                               </div>
//                             </div>
//                             </div>
        

//         {/* Profile Icon */}
//         <div className="flex justify-center mb-6 mt-6">
//           <div className="
//             w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center 
//             shadow-md
//           ">
//             <UserOutlined className="text-5xl text-purple-600" />
//           </div>
//         </div>

//         {/* Info */}
//         <div className="space-y-4 text-lg">
//           <div className="flex items-center gap-3">
//             <UserOutlined className="text-purple-500 text-2xl" />
//             <p className="text-gray-700">
//               <span className="font-semibold">Name:</span> {user?.name}
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <MailOutlined className="text-gray-500 text-2xl" />
//             <p className="text-gray-700">
//               <span className="font-semibold">Email:</span> {user?.email}
//             </p>
//           </div>
//         </div>
//       </Card>
//     </Layout>
//   );
// }
















// import Layout from "../components/Layout";
// import { Card, Tag } from "antd";
// import { useSelector } from "react-redux";
// import {
//   UserOutlined,
//   MailOutlined,
//   SafetyOutlined,
// } from "@ant-design/icons";
// import { BsPersonVcardFill } from "react-icons/bs";

// export default function Profile() {
//   const { user } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.tasks);
       
//   // Task stats for this user
//   const totalTasks = items.length;
//   const completedTasks = items.filter(t => t.status === "completed").length;
//   const pendingTasks = items.filter(t => t.status === "pending").length;

//   // Initials for avatar
//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase() || "U";

//   return (
//     <Layout>
//       <Card
//         className="
//           max-w-full mx-auto mt-6
//           rounded-2xl shadow-xl border-0
//           bg-white/70 backdrop-blur-xl
//         "
//         bodyStyle={{ padding: 30 }}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 pb-4 border-b">
//           <BsPersonVcardFill className="text-3xl text-purple-800" />
//           <div>
//             <h1 className="text-3xl font-bold text-purple-800">
//               Your Profile
//             </h1>
//             <p className="text-gray-600">
//               Personal info & activity overview
//             </p>
//           </div>
//         </div>

//         {/* Avatar + Name */}
//         <div className="flex flex-col items-center mt-8">
//           <div
//             className="
//               w-28 h-28 rounded-full
//               bg-gradient-to-br from-purple-600 to-indigo-500
//               flex items-center justify-center
//               text-white text-4xl font-bold
//               shadow-lg
//             "
//           >
//             {initials}
//           </div>

//           <h2 className="mt-4 text-2xl font-bold text-gray-800">
//             {user?.name}
//           </h2>

//           <Tag
//             className="mt-2 px-4 py-1 rounded-full font-semibold"
//             color={user?.role === "admin" ? "purple" : "blue"}
//           >
//             {user?.role?.toUpperCase() || "USER"}
//           </Tag>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

//           {/* Personal Info */}
//           <div className="space-y-4">
//             <h3 className="font-bold text-lg text-purple-700">
//               Personal Information
//             </h3>

//             <div className="flex items-center gap-3">
//               <UserOutlined className="text-purple-500 text-xl" />
//               <span className="text-gray-700">
//                 <b>Name:</b> {user?.name}
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               <MailOutlined className="text-gray-500 text-xl" />
//               <span className="text-gray-700">
//                 <b>Email:</b> {user?.email}
//               </span>
//             </div>
//           </div>

//           {/* Account Stats */}
//           <div className="space-y-4">
//             <h3 className="font-bold text-lg text-purple-700">
//               Your Activity
//             </h3>

//             <div className="flex justify-between bg-gray-50 p-4 rounded-xl">
//               <span>Total Tasks</span>
//               <b>{totalTasks}</b>
//             </div>

//             <div className="flex justify-between bg-green-50 p-4 rounded-xl">
//               <span>Completed</span>
//               <b className="text-green-700">{completedTasks}</b>
//             </div>

//             <div className="flex justify-between bg-yellow-50 p-4 rounded-xl">
//               <span>Pending</span>
//               <b className="text-yellow-700">{pendingTasks}</b>
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="mt-10 p-5 rounded-xl bg-purple-50 border border-purple-100">
//           <div className="flex items-center gap-2 mb-2">
//             <SafetyOutlined className="text-purple-600" />
//             <h3 className="font-bold text-purple-700">
//               Account Security
//             </h3>
//           </div>
//           <p className="text-sm text-gray-600">
//             Your account is protected. Keep your credentials safe and
//             update your password regularly.
//           </p>
//         </div>
//       </Card>
//     </Layout>
//   );
// }


import Layout from "../components/Layout";
import { Card, Tag, Progress } from "antd";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  MailOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { BsPersonVcardFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.tasks);

  const totalTasks = items.length;
  const completedTasks = items.filter(t => t.status === "completed").length;
  const pendingTasks = items.filter(t => t.status === "pending").length;

  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const initials =
    user?.name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Layout>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT – PROFILE IDENTITY */}
        <Card className="rounded-2xl shadow-lg border-0">
          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="
              w-28 h-28 rounded-full
              bg-gradient-to-br from-gray-600 to-purple-500
              flex items-center justify-center
              text-white text-4xl font-bold
              shadow-2xl
            ">
              {initials}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user?.name}
            </h2>

            <Tag
              className="mt-2 px-4 py-1 rounded-full font-semibold"
              color={user?.role === "admin" ? "blue" : "purple"}
            >
              {user?.role?.toUpperCase() || "USER"}
            </Tag>

            {/* Info */}
            <div className="mt-6 w-full space-y-4 text-left">
              <div className="flex items-center gap-3">
                <UserOutlined className="text-purple-500 text-base" />
                <span className="text-gray-700 font-semibold text-base">{user?.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <MailOutlined className="text-purple-500 text-base" />
                <span className="text-gray-700 font-semibold text-base mb-1">{user?.email}</span>
              </div>
            </div>

            {/* Welcome */}
            <div className="mt-6 text-sm text-purple-500">
              Welcome 👋  
              <br />
              Manage your work & stay productive.
            </div>
          </div>
        </Card>

        {/* RIGHT – ACTIVITY & INSIGHTS */}
        <Card
          className="lg:col-span-2 rounded-2xl shadow-xl border-0"
          bodyStyle={{ padding: 30 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b pb-4 mb-6">
            <BsPersonVcardFill className="text-3xl text-purple-800 mb-4" />
            <div>
              <h1 className="text-2xl font-bold text-purple-800">
                Account Overview
              </h1>
              <p className="text-gray-600 text-sm">
                Your productivity & account insights
              </p>
            </div>
          </div>

          {/* Task Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-blue-50">
              <p className="text-lg text-blue-500 font-semibold">Total Tasks</p>
              <h3 className="text-xl font-bold ">{totalTasks}</h3>
            </div>

            <div className="p-4 rounded-xl bg-green-50">
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold text-green-700">
                {completedTasks}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-yellow-50">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-700">
                {pendingTasks}
              </h3>
            </div>
          </div> */}

          {/* Progress */}
          <div className="mt-8">
            <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                          <h2 className="text-xl font-bold text-purple-800">
Task Completion</h2>
              <span className="text-gray-800 text-lg">{completionPercent}%</span>
            </div>
   <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Progress
              percent={completionPercent}
              strokeColor={{
                "0%": "#a855f7",
                "100%": "#22c55e",
              }}
              showInfo={false}
            />
             </motion.div>
          </div>
         

          {/* Status Insight */}
          <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-gray-50">
            {completionPercent >= 70 ? (
              <>
                <CheckCircleOutlined className="text-green-600 text-xl" />
                <span className="font-semibold text-green-700">
                  Great progress! Keep it up 
                </span>
              </>
            ) : (
              <>
                <ClockCircleOutlined className="text-yellow-600 text-xl" />
                <span className="font-semibold text-yellow-700">
                  Some tasks need attention
                </span>
              </>
            )}
          </div>

          {/* Security */}
          <div className="mt-8 p-5 rounded-xl bg-purple-50 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <SafetyOutlined className="text-purple-600 text-lg" />
              <h3 className="font-bold text-purple-700">
                Account Security
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Your account is secure. For best protection,
              keep your password private and up to date.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}


