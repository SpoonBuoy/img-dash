import { useState } from "react";
import { logout } from "../../services/auth.service";
export default function Logout() {
	const [logoutButtonText, setLogoutButtonText] = useState("Logout");
 const handleLogoutButton = () => {
    logout(setLogoutButtonText);

  };
  return (
    <div className="flex flex-col lg:flex-row space-y-20 lg:space-x-20 lg:space-y-0 justify-between">
          <button
            onClick={handleLogoutButton}
            className={`text-lg text-white bg-blue-600 p-2 rounded-lg`}
          >
	  {logoutButtonText}
          </button>
    </div>
  );
}
