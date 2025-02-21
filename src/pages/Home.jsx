import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DroppableSection from "../components/home/DroppableSection";
import axios from "axios";

const Home = () => {
  const [tasks1, setTasks1] = useState([
    { id: "1", title: "Task 1", status: "todo" },
    { id: "2", title: "Task 2", status: "todo" },
    // { id: "3", title: "Task 3", status: "inProgress" },
    // { id: "4", title: "Task 4", status: "done" },
  ]);

  const [tasks12, setTasks12] = useState([
    { id: "12", title: "Task 12", status: "todo" },
    { id: "22", title: "Task 22", status: "todo" },
    // { id: "3", title: "Task 3", status: "inProgress" },
    // { id: "4", title: "Task 4", status: "done" },
  ]);

  const [tasks3, setTasks3] = useState([
    { id: "13", title: "Task 13", status: "todo" },
    { id: "23", title: "Task 23", status: "todo" },
    // { id: "3", title: "Task 3", status: "inProgress" },
    // { id: "4", title: "Task 4", status: "done" },
  ]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await axios.patch(`/api/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>TaskHandler</title>
      </Helmet>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 justify-items-center gap-4">
          <DroppableSection id="todo" title="To-Do" tasks={tasks1} />
          <DroppableSection
            id="inProgress"
            title="In Progress"
            tasks={tasks12}
          />
          <DroppableSection id="done" title="Done" tasks={tasks3} />
        </div>
      </DndContext>
    </div>
  );
};

export default Home;
