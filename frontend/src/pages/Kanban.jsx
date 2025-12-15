// import Layout from "../components/Layout";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Card } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { updateTask } from "../features/tasks/tasksSlice";
// import { FaChalkboardTeacher } from "react-icons/fa";

// export default function Kanban() {
//   const { items } = useSelector((state) => state.tasks);
//   const dispatch = useDispatch();

//   const statuses = [
//     { key: "pending", label: "Pending", color: "bg-yellow-100", titleColor: "text-yellow-700" },
//     { key: "in_progress", label: "In Progress", color: "bg-blue-100", titleColor: "text-blue-700" },
//     { key: "completed", label: "Completed", color: "bg-green-100", titleColor: "text-green-700" },
//   ];

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const taskId = result.draggableId;
//     const newStatus = result.destination.droppableId;

//     dispatch(updateTask({ id: taskId, data: { status: newStatus } }));
//   };

//   return (
//     <Layout>
//        <Card
//         className="
//           max-w-auto mx-auto mt-6 shadow-xl border-0 rounded-2xl 
//           hover:shadow-2xl transition-all duration-300
//         "
//         bodyStyle={{ padding: "30px" }}
//       >
//       <DragDropContext onDragEnd={onDragEnd}>
//         {/* <div className="flex items-center justify-center mb-6">
//           <h1 className="text-3xl font-bold tracking-wide">Kanban Board</h1>
//         </div> */}
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">

//          <div className="flex items-center gap-3">
//                       <FaChalkboardTeacher className="text-3xl text-purple-800 mb-4" />
//                       <div>
//                         <h1 className="text-3xl font-bold text-purple-800">Kanban Board</h1>
//                         <p className="text-gray-700 mt-0">
//                     Stay organized & plan your tasks effectively with your smart calendar.
//                   </p>
//                       </div>
//                     </div>
//                     </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-4">
//           {statuses.map(({ key, label, color, titleColor }) => (
//             <Droppable droppableId={key} key={key}>
//               {(provided) => (
//                 <Card
//                   className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all border-0`}
//                   bodyStyle={{ padding: "15px", minHeight: "65vh" }}
//                   title={
//                     <h2 className={`font-bold text-xl text-center ${titleColor}`}>
//                       {label}
//                     </h2>
//                   }
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                 >
//                   <div className={`p-2 rounded-xl ${color}`}>
//                     {items
//                       .filter((t) => t.status === key)
//                       .map((t, index) => (
//                         <Draggable
//                           draggableId={String(t.id)}
//                           index={index}
//                           key={t.id}
//                         >
//                           {(provided) => (
//                             <div
//                               className="
//                                 p-4 mb-3 bg-white rounded-xl shadow-md border 
//                                 hover:shadow-lg transition-all cursor-pointer
//                               "
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                               <p className="font-semibold text-gray-800">
//                                 {t.title}
//                               </p>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 </Card>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//       </Card>
//     </Layout>
//   );
// }



import Layout from "../components/Layout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Tag, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/tasks/tasksSlice";
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Kanban() {
  const { items } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const statuses = [
    {
      key: "pending",
      label: "Pending",
      icon: <ClockCircleOutlined />,
      header: "from-yellow-400 to-orange-400",
      chip: "bg-yellow-100 text-yellow-700",
    },
    {
      key: "in_progress",
      label: "In Progress",
      icon: <SyncOutlined />,
      header: "from-blue-500 to-cyan-400",
      chip: "bg-blue-100 text-blue-700",
    },
    {
      key: "completed",
      label: "Completed",
      icon: <CheckCircleOutlined />,
      header: "from-green-500 to-emerald-400",
      chip: "bg-green-100 text-green-700",
    },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    dispatch(updateTask({ id: taskId, data: { status: newStatus } }));
  };

  const priorityTag = (p) =>
    p === "high" ? (
      <Tag color="red">HIGH</Tag>
    ) : p === "medium" ? (
      <Tag color="gold">MEDIUM</Tag>
    ) : (
      <Tag color="green">LOW</Tag>
    );
const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <Layout>
      <Card
        className="mt-6 shadow-xl border-0 rounded-2xl"
        bodyStyle={{ padding: 30 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4">
          <FaChalkboardTeacher className="text-3xl text-purple-800" />
          <div>
            <h1 className="text-3xl font-bold text-purple-800">Kanban Board</h1>
            <p className="text-gray-600">
              Drag tasks across stages to track progress
            </p>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {statuses.map((col) => {
              const columnItems = items.filter((t) => t.status === col.key);
              return (
                <Droppable droppableId={col.key} key={col.key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="
                        rounded-2xl overflow-hidden
                        bg-white/70 backdrop-blur
                        border border-white/60 shadow-lg
                      "
                    >
                      {/* Column Header */}
                      <div
                        className={`px-4 py-3 bg-gradient-to-r ${col.header} text-white flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2 font-bold">
                          {col.icon}
                          {col.label}
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold">
                          {columnItems.length}
                        </span>
                      </div>

                      {/* Column Body */}
                      <div className="p-4 h-[60vh] space-y-3 overflow-y-auto custom-scrollbar2 ">
                        {columnItems.length === 0 && (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Drop tasks here"
                          />
                        )}

                        {columnItems.map((t, index) => (
                          <Draggable
                            draggableId={String(t.id)}
                            index={index}
                            key={t.id}
                          >
                            {(prov) => (
                              <motion.div
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                whileHover={{ y: -2 }}
                                className="
                                  bg-white rounded-xl border
                                  shadow-sm hover:shadow-md
                                  transition cursor-pointer
                                "
                              >
                                {/* Drag handle */}
                                <div
                                  {...prov.dragHandleProps}
                                  className="px-4 pt-3 flex items-start justify-between mb-1 "
                                >
                                  <p className="font-semibold text-gray-800">
                                    {t.title}
                                  </p>

                                  {priorityTag(t.priority)}
                                </div>

                                {/* Meta */}
                                <div className="px-4 pb-3 text-xs text-gray-400 flex justify-between">
                                  <span className={`px-2 py-0.5 rounded ${col.chip}`}>
                                    {col.label}
                                  </span>
                                  <span>{formatDate(t.due_date || "No deadline")}</span>
                                </div>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </Card>
    </Layout>
  );
}
