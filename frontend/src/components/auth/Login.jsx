import { useState } from "react";
import { login } from "../../services/auth.service";

export default function SignUpLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButton, setLoginButton] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState("Login");


  const handleInput = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
      if (e.target.value !== "" && password !== "") setLoginButton(true);
      else setLoginButton(false);
    } else {
      setPassword(e.target.value);
      if (e.target.value !== "" && email !== "") setLoginButton(true);
      else setLoginButton(false);
    }
  };

  const handleLoginButton = () => {
    const data = {
      email: email,
      password: password,
    };
    login(data, setLoginButtonText);
    setEmail('');
    setPassword('');
    setLoginButton(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-[30%] flex flex-col items-center justify-center space-y-10 bg-blue-100 px-20 py-10 rounded-md">
        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="text-lg font-medium">
            Username
          </label>
          <input
            name="email"
            id="email"
            type="text"
            value={email}
            onChange={handleInput}
            className="border-2 border-gray-400 rounded-lg p-1 bg-gray-200"
          ></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={handleInput}
            className="border-2 border-gray-400 rounded-lg p-1 bg-gray-200"
          ></input>
        </div>
        <div>
          <button
            onClick={handleLoginButton}
            disabled={!loginButton}
            className={` ${
              !loginButton ? "bg-gray-400" : ""
            } text-lg text-white bg-blue-600 p-2 rounded-lg`}
          >
	  {loginButtonText} 
          </button>
        </div>
      </div>
    </div>
  );
}
