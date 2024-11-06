import { CiUser } from "react-icons/ci";
import {
  FaClipboardList,
  FaStethoscope,
  FaSyringe,
  FaUserInjured,
  FaBed,
} from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { AiOutlineCalendar,AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import { PATH_DASHBOARD } from "../../routes/paths";
const Sidebar = () => {
  const { user,isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(url);
  };

  const handleProfileClick = () => {
    navigate(`/dashboard/profile`);
  };

  const renderLinksByRole = () => {
    if (!user?.roles) return null;

    if (user.roles.includes("ADMIN")) {
      return (
        <>
          <button
            onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <MdOutlineMedicalServices className="text-orange-400 w-6 h-6" />
            <span className="font-medium text-sm">User</span>
          </button>

          

          <button
            onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <AiOutlineCalendar className="text-green-400 w-6 h-6" />
            <span className="font-medium text-sm">My Logs</span>
          </button>

          <button
            onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <AiOutlineCalendar className="text-green-400 w-6 h-6" />
            <span className="font-medium text-sm">System Logs</span>
          </button>
          <button
            onClick={() => handleClick(PATH_DASHBOARD.artworkList)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <AiOutlineCalendar className="text-green-400 w-6 h-6" />
            <span className="font-medium text-sm">Art Works</span>
          </button>
          <button
            onClick={() => handleClick(PATH_DASHBOARD.artCategoryPage)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <AiOutlineCalendar className="text-green-400 w-6 h-6" />
            <span className="font-medium text-sm">Art Category</span>
          </button>
          <button
            onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
            className="flex items-center gap-3 text-gray-300 hover:bg-blue-800 p-3 rounded-lg w-full transition"
          >
            <AiOutlineCalendar className="text-green-400 w-6 h-6" />
            <span className="font-medium text-sm">System Logs</span>
          </button>

         

          
        </>
      );
    }

    

    

   
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 min-h-screen w-64 p-6 shadow-lg flex flex-col justify-between">
      {/* Profile Section */}
      <div>
      <div onClick={handleProfileClick} className="flex items-center gap-4 border-b border-gray-600 pb-4 cursor-pointer">
      <CiUser className="w-10 h-10 text-white" />
      <div>
        <h4 className="text-lg font-semibold text-white">
          {user?.firstName} {user?.lastName}
        </h4>
        <p className="text-sm text-gray-400">{user?.roles?.[0]}</p>
      </div>
    </div>

        {/* Menu Section */}
        <div className="mt-8">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Menu
          </div>
          <div className="space-y-3">{renderLinksByRole()}</div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-4 border-t border-gray-600 pt-4 sticky bottom-1">
  {isAuthenticated && (
    <button
      onClick={logout}
      className="flex items-center gap-3 text-gray-700 bg-gray-100 hover:bg-red-500 hover:text-white p-3 rounded-lg w-full transition duration-300"
    >
      <AiOutlineLogout className="w-6 h-6 text-red-400 hover:text-white transition duration-300" />
      <span className="font-medium text-sm">Logout</span>
    </button>
  )}
</div>
    </div>
  );
};

export default Sidebar;