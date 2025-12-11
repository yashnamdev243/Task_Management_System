// import Layout from "../components/Layout";
// import { Card } from "antd";
// import { useSelector } from "react-redux";

// export default function Profile() {
//   const { user } = useSelector(state => state.auth);

//   return (
//     <Layout>
//       <Card  className="max-w-lg mx-auto">
//          <div className="flex items-center justify-center  mb-4">
//               <h1 className="text-3xl font-bold">Your Profile </h1>
//             </div>
//         <p><b>Name:</b> {user?.name}</p>
//         <p><b>Email:</b> {user?.email}</p>
//       </Card>
//     </Layout>
//   );
// }


import Layout from "../components/Layout";
import { Card } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { BsPersonVcardFill } from "react-icons/bs";

export default function Profile() {
  const { user } = useSelector(state => state.auth);

  return (
    <Layout>
      <Card
        className="
          max-w-full mx-auto mt-6 shadow-xl border-0 rounded-2xl 
          hover:shadow-2xl transition-all duration-300
        "
        bodyStyle={{ padding: "30px" }}
      >
        {/* Title */}
        {/* <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Your Profile
          </h1>
        </div> */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        
                 <div className="flex items-center gap-3">
                              <BsPersonVcardFill className="text-3xl text-cyan-800 mb-4" />
                              <div>
                                <h1 className="text-3xl font-bold text-cyan-800">Your Profile</h1>
                                <p className="text-cyan-700 mt-0">
                            Manage your personal information and account settings.
                          </p>
                              </div>
                            </div>
                            </div>
        

        {/* Profile Icon */}
        <div className="flex justify-center mb-6 mt-6">
          <div className="
            w-24 h-24 rounded-full bg-green-100 flex items-center justify-center 
            shadow-md
          ">
            <UserOutlined className="text-5xl text-cyan-600" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-3">
            <UserOutlined className="text-cyan-500 text-2xl" />
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MailOutlined className="text-green-500 text-2xl" />
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
