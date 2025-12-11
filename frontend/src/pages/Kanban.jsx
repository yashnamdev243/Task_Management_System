import Layout from "../components/Layout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/tasks/tasksSlice";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Kanban() {
  const { items } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const statuses = [
    { key: "pending", label: "Pending", color: "bg-yellow-100", titleColor: "text-yellow-700" },
    { key: "in_progress", label: "In Progress", color: "bg-blue-100", titleColor: "text-blue-700" },
    { key: "completed", label: "Completed", color: "bg-green-100", titleColor: "text-green-700" },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    dispatch(updateTask({ id: taskId, data: { status: newStatus } }));
  };

  return (
    <Layout>
       <Card
        className="
          max-w-auto mx-auto mt-6 shadow-xl border-0 rounded-2xl 
          hover:shadow-2xl transition-all duration-300
        "
        bodyStyle={{ padding: "30px" }}
      >
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">Kanban Board</h1>
        </div> */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">

         <div className="flex items-center gap-3">
                      <FaChalkboardTeacher className="text-3xl text-cyan-800 mb-4" />
                      <div>
                        <h1 className="text-3xl font-bold text-cyan-800">Kanban Board</h1>
                        <p className="text-cyan-700 mt-0">
                    Stay organized & plan your tasks effectively with your smart calendar.
                  </p>
                      </div>
                    </div>
                    </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-4">
          {statuses.map(({ key, label, color, titleColor }) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <Card
                  className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all border-0`}
                  bodyStyle={{ padding: "15px", minHeight: "65vh" }}
                  title={
                    <h2 className={`font-bold text-xl text-center ${titleColor}`}>
                      {label}
                    </h2>
                  }
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={`p-2 rounded-xl ${color}`}>
                    {items
                      .filter((t) => t.status === key)
                      .map((t, index) => (
                        <Draggable
                          draggableId={String(t.id)}
                          index={index}
                          key={t.id}
                        >
                          {(provided) => (
                            <div
                              className="
                                p-4 mb-3 bg-white rounded-xl shadow-md border 
                                hover:shadow-lg transition-all cursor-pointer
                              "
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <p className="font-semibold text-gray-800">
                                {t.title}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      </Card>
    </Layout>
  );
}
