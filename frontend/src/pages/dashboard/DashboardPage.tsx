
import AdminPage from "./AdminPage";
import useAuth from "../../hooks/useAuth.hook";
import UserPage from "./UserPage";


const DashboardPage: React.FC = () => {

  const { user: loggedInUser } = useAuth();
  const roles = loggedInUser?.roles;
  return (
    <div >
      {roles?.includes("Admin") && (
        <AdminPage></AdminPage>
      )}
      {roles?.includes("User") && (
        <UserPage></UserPage>
      )}
    </div>
  );
};

export default DashboardPage;
