import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
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
    </div>
  );
};

export default TaskCard;
