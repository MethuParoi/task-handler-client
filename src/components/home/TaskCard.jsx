import { useDraggable } from "@dnd-kit/core";
import { IoMdTimer } from "react-icons/io";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.taskId,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card w-96 bg-base-100 shadow-sm p-4 cursor-grab"
    >
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <h2 className="text-md my-2">{task.description}</h2>
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
