import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import { allAccessRoles, adminAccessRoles, adminDoctorPatientRoles } from "../auth/auth.utils";
import Layout from "../components/layout";

// Lazy load components
const AdminPage = lazy(() => import("../pages/dashboard/AdminPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const MyLogsPage = lazy(() => import("../pages/dashboard/MyLogsPage"));
const SystemLogsPage = lazy(() => import("../pages/dashboard/SystemLogsPage"));
const UpdateRolePage = lazy(() => import("../pages/dashboard/UpdateRolePage"));
const DoctorPage = lazy(() => import("../pages/dashboard/DoctorPage"));
const NursePage = lazy(() => import("../pages/dashboard/NursePage"));
const UserPage = lazy(() => import("../pages/dashboard/UserPage"));
const UsersManagementPage = lazy(
  () => import("../pages/dashboard/UsersManagementPage")
);
const LoginPage = lazy(() => import("../pages/public/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/public/NotFoundPage"));
const RegisterPage = lazy(() => import("../pages/public/RegisterPage"));
const UnauthorizedPage = lazy(() => import("../pages/public/UnauthorizedPage"));
const DoctorList = lazy(() => import("../pages/dashboard/DoctorList"));
const NurseList = lazy(() => import("../pages/dashboard/NurseList"));
const PatientList = lazy(() => import("../pages/dashboard/PatientList"));
const EditPatient = lazy(() => import("../pages/dashboard/EditPatient"));
const EditNurse = lazy(() => import("../pages/dashboard/EditNurse"));
const EditDoctor = lazy(() => import("../pages/dashboard/EditDoctor"));
const Appointment = lazy(() => import("../pages/dashboard/Appointment"));
const EditAppointment = lazy(() => import("../pages/dashboard/EditAppointment"));
const Rooms = lazy(() => import("../pages/dashboard/RoomList"));
const Department = lazy(() => import("../pages/dashboard/DepartmentList"));
const EditDepartment = lazy(() => import("../pages/dashboard/EditDepartment"));
const MedicalRecord = lazy(() => import("../pages/dashboard/MedicalRecordsPage"));
const ProfilePage = lazy(() => import("../pages/dashboard/ProfilePage"));
const UpdateProfile = lazy(() => import("../pages/dashboard/UpdateProfilePage"));
const TeamList = lazy(() => import("../pages/dashboard/TeamList"));
const UpdateTeam = lazy(() => import("../pages/dashboard/EditTeam"));
const PlayerList = lazy(() => import("../pages/dashboard/PlayerList"));
const UpdatePlayer = lazy(() => import("../pages/dashboard/EditPlayer"));
const PlanetList = lazy(() => import("../pages/dashboard/PlanetList"));



const GlobalRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        <Route
          path={PATH_PUBLIC.register}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path={PATH_PUBLIC.login}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path={PATH_PUBLIC.unauthorized}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UnauthorizedPage />
            </Suspense>
          }
        />

        {/* Public Routes */}
        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.dashboard}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.teamList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TeamList />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.updateTeam}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateTeam />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.playerList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PlayerList />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.updatePlayer}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdatePlayer />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.planetList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PlanetList />
              </Suspense>
            }
          />
          {/* <Route
            path={PATH_DASHBOARD.updatePlanet}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdatePlanet />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.sateliteList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SateliteList />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.updateSatelite}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateSatelite />
              </Suspense>
            }
          /> */}
          <Route
            path={PATH_DASHBOARD.myLogs}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyLogsPage />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.profilePage}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.updateProfile}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateProfile />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.user}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserPage />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.patientList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PatientList />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.editPatient}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditPatient />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.doctor}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DoctorPage />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.doctorList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DoctorList />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.editDoctor}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditDoctor />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.nurse}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NursePage />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.editNurse}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditNurse />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.nurseList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NurseList />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.roomList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Rooms />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.departmentList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Department />
              </Suspense>
            }
          />


          <Route
            path={PATH_DASHBOARD.editDepartment}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditDepartment />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.medicalRecordList}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MedicalRecord />
              </Suspense>
            }
          />
        </Route>

        <Route element={<AuthGuard roles={adminDoctorPatientRoles}/>}>
        <Route
            path={PATH_DASHBOARD.appointment}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Appointment />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.editAppointment}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditAppointment />
              </Suspense>
            }
            />
        </Route>

        {/* Admin Routes */}
        <Route element={<AuthGuard roles={adminAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.usersManagement}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UsersManagementPage />
              </Suspense>
            }
          />

          <Route
            path={PATH_DASHBOARD.updateRole}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateRolePage />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.systemLogs}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SystemLogsPage />
              </Suspense>
            }
          />
          <Route
            path={PATH_DASHBOARD.admin}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={PATH_PUBLIC.notFound}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={<Navigate to={PATH_PUBLIC.notFound} replace />}
        />
      </Route>
    </Routes>
  );
};

export default GlobalRouter;
