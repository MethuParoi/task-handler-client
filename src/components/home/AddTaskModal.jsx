import { useForm } from "react-hook-form";

const AddTaskModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //random taskId
  const taskId = Math.floor(Math.random() * 10000);

  //submit form data
  const onSubmit = async (data) => {
    const taskInfo = {
      taskId: taskId,
      taskTitle: data.title,
      taskDescription: data.description,
      photoURL: data.photoUrl,
    };
    try {
      await axios.post("/api/tasks", taskInfo);
      // handle success (e.g., close modal, show success message)
    } catch (error) {
      // handle error (e.g., show error message)
    }
  };

  return (
    <dialog id="AddTaskModal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form
          className="flex flex-col items-center justify-center gap-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-semibold text-indigo-800">Add Task</h1>
          {/* title input */}
          <div className="relative mb-8 w-[80%]">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Task Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "title is required",
                maxLength: {
                  value: 50,
                  message: "Title cannot exceed 50 characters",
                },
              })}
              aria-invalid={errors.title ? "true" : "false"}
              placeholder="Enter task title"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />
            {errors.title && (
              <span className="text-red-500 absolute bottom-[-25px] left-0">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* description */}
          <div className="relative mb-8 w-[80%]">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Task Description
            </label>
            <input
              type="text"
              {...register("description", {
                required: "description is required",
                maxLength: {
                  value: 200,
                  message: "description cannot exceed 200 characters",
                },
              })}
              aria-invalid={errors.description ? "true" : "false"}
              placeholder="Enter task description"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />
            {errors.description && (
              <span className="text-red-500 absolute bottom-[-25px] left-0">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* category */}
          <div className="relative mb-8 w-[80%]">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Task category
            </label>
            <select
              id="category"
              name="category"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.category && (
              <span className="text-red-500 absolute bottom-[-25px] left-0">
                {errors.category.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-[80%] px-4 py-2 text-lg font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddTaskModal;

{
  /* You can open the modal using document.getElementById('ID').showModal() method */
}
