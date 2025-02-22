import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { IoAddCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        // toast.success("User logged out successfully");
        navigate("/"); // Navigate after successful logout
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
  };

  return (
    <div className="navbar bg-indigo-300 shadow-sm px-8 text-yellow-100 flex justify-between items-center">
      <div className="">
        <a className="btn btn-ghost text-xl">TaskHandler</a>
      </div>

      <div className=" flex gap-x-4">
        <button
          className="px-2 sm:px-4 py-1 sm:py-2  bg-yellow-200 rounded-xl text-md sm:text-lg text-gray-600 font-semibold cursor-pointer hover:bg-yellow-400 flex gap-x-2 items-center"
          onClick={() => document.getElementById("AddTaskModal").showModal()}
        >
          <p className="hidden sm:block">Add Task</p>
          <IoAddCircleOutline className="text-2xl" />
        </button>
        {user ? (
          <button
            onClick={() => handleLogout()}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-yellow-200 rounded-xl text-md sm:text-lg text-gray-600 font-semibold cursor-pointer hover:bg-yellow-400"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-yellow-200 rounded-xl text-md sm:text-lg text-gray-600 font-semibold cursor-pointer hover:bg-yellow-400"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
