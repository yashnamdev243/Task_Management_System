import { Calendar, Card } from "antd";
import Layout from "../components/Layout";
import { CalendarOutlined } from "@ant-design/icons";

export default function CalendarView() {
  return (
    <Layout>
      <Card
        className="
          max-w-5xl mx-auto mt-8 rounded-3xl shadow-xl border-0 
          bg-white/90 backdrop-blur-lg transition-all duration-300
          hover:shadow-2xl hover:bg-white
        "
        bodyStyle={{ padding: "35px" }}
      >
        {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
          {/* <div className="
            flex items-center gap-4 px-6 py-3 rounded-xl 
            bg-gradient-to-r from-cyan-600 to-green-600 shadow-md
            text-white animate-fadeIn
          ">
            <CalendarOutlined className="text-3xl" />
            <h1 className="text-xl font-bold tracking-wide">
              Calendar Overview
            </h1>
          </div> */}
 <div className="flex items-center gap-3">
              <CalendarOutlined className="text-3xl text-purple-800 mb-4" />
              <div>
                <h1 className="text-3xl font-bold text-purple-800">Calendar Overview</h1>
                <p className="text-gray-700 mt-0">
            Stay organized & plan your tasks effectively with your smart calendar.
          </p>
              </div>
            </div>
         
        </div>

        {/* CALENDAR BOX */}
        <div
          className="
            bg-gray-50 p-4 md:p-6 rounded-2xl shadow-inner border 
            border-gray-200 transition-all duration-300
            hover:shadow-lg mt-6
          "
        >
          <Calendar fullscreen />
        </div>
      </Card>
    </Layout>
  );
}
