import { useDraggable } from "@dnd-kit/core";
import { IoMdTimer } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FaGripVertical } from "react-icons/fa";

const TaskCard = ({ task, setRefetchTodo }) => {
  const axiosPublic = useAxiosPublic();
  const { user, setTaskDetails } = useContext(AuthContext);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.taskId,
    activationConstraint: { delay: 250, tolerance: 5 },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  //handle delete
  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await axiosPublic
        .delete(`/user/delete-task/${user?.email}/${task?.taskId}`)
        .then((res) => {
          toast.success("Task deleted successfully!");
          setRefetchTodo((prev) => !prev);
        });
    } catch (error) {
      toast.error("Error deleting task:", error);
    }
  };

  //handle edit
  const handleEdit = () => {
    try {
      axiosPublic
        .get(`/user/get-task/${user?.email}/${task?.taskId}`)
        .then((res) => {
          setTaskDetails(res.data);
          document.getElementById("EditTaskModal").showModal();
        });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card w-[320px] sm:w-96 bg-base-100 shadow-sm pt-8 pb-4 px-4 cursor-grab active:cursor-grabbing"
      // className="card w-[320px] sm:w-96 bg-base-100 shadow-sm pt-8 pb-4 px-4 cursor-grab"
    >
      {/* Drag Handle Button - Only visible on mobile (hidden on large screens) */}
      <button
        {...listeners}
        {...attributes}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing block md:hidden"
      >
        <FaGripVertical size={24} />
      </button>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <h2 className="text-md my-2">{task.description}</h2>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              // document.getElementById("AddTaskModal").showModal();
              handleEdit();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-x-5">
        <button className="text-md font-semibold text-indigo-800 py-2 px-4 bg-yellow-200 rounded-lg">
          {task.status}
        </button>

        <div className="flex items-center gap-x-2">
          <IoMdTimer className="text-xl text-indigo-800" />
          <button className="text-md font-semibold text-blue-800">
            {task.timeStamp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

