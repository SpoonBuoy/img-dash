import { useEffect, useState } from "react";
import { validateUser } from "../../services/auth.service";

export default function Navbar({
  handleLogin,
  handleSignUp,
  handleAdminDashboard,
  handleUserDashboard,
  currentComponent,
  handleLogout
}) {
  const [userLogedIn, setUserLogedIn] = useState(true);

  useEffect(() => {
    const isLogedIn = async () => {
      const res = await validateUser();
      setUserLogedIn(res);
    };
    isLogedIn();
  }, []);
 

  return (
    <div className="bg-blue-500 flex items-center p-5 justify-center space-x-5">
      <button
        onClick={handleUserDashboard}
        className={`${
          currentComponent === "UserDashboard" ? "bg-green-300" : "bg-blue-400"
        } text-lg p-2 rounded-lg`}
      >
        User Dashboard
      </button>
      <button
        onClick={handleAdminDashboard}
        className={`${
          currentComponent === "AdminDashboard" ? "bg-green-300" : "bg-blue-400"
        } text-lg p-2 rounded-lg`}
      >
        Admin Dashboard
      </button>
      {!userLogedIn ? (
        <button
          onClick={handleLogin}
          className={`${
            currentComponent === "Login" ? "bg-green-300" : "bg-blue-400"
          } text-lg p-2 rounded-lg`}
        >
          Login
        </button>
      ) : (
        <></>
      )}

      {!userLogedIn ? (
        <button
          onClick={handleSignUp}
          className={`${
            currentComponent === "SignUp" ? "bg-green-300" : "bg-blue-400"
          } text-lg p-2 rounded-lg`}
        >
          Sign Up
        </button>
      ) : (
        <></>
      )}
      {userLogedIn ? (
        <button
          onClick={handleLogout}
          className={`${
            currentComponent === "Logout" ? "bg-green-300" : "bg-blue-400"
          } text-lg p-2 rounded-lg`}
        >
          Log Out
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
