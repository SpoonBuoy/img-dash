import { useEffect, useState } from "react";
import { signUp } from "../../services/auth.service";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [signUpButton, setSignUpButton] = useState(false);
  const [error, setError] = useState(false);
	const[signUpButtonText, setSignUpButtonText] = useState("Sign Up");

	//validation for character limit
  const handleInput = (e) => {
	  if (e.target.id === "username") {
      setUserName(e.target.value);
      if (
        e.target.value !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        email !== "" &&
        isAdmin !== true
      )
        setSignUpButton(true);
      else setSignUpButton(false);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      if (
        e.target.value !== "" &&
        userName !== "" &&
        confirmPassword !== "" &&
        email !== "" &&
        isAdmin !== true
      )
        setSignUpButton(true);
      else setSignUpButton(false);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      if (
        e.target.value !== "" &&
        userName !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        isAdmin !== false
      )
        setSignUpButton(true);
      else setSignUpButton(false);
    } else if (e.target.id === "isAdmin") {
      setIsAdmin(!isAdmin);
      if (
        e.target.value !== true &&
        userName !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== ""
      )
        setSignUpButton(true);
      else setSignUpButton(false);
    } else {
      setConfirmPassword(e.target.value);
      if (
        e.target.value !== "" &&
        password !== "" &&
        userName !== "" &&
        email !== "" &&
        isAdmin !== true
      )
        setSignUpButton(true);
      else setSignUpButton(false);
    }
// validation for character limit
const limit = 5;

if (userName.length < limit || email.length < limit || password.length < 5 ) {
  setSignUpButton(false);
	setSignUpButtonText("Character Limit not satisfied for userName and Email");
} else {
	setSignUpButtonText("SignUp");
  setSignUpButton(true);
}


  };

  const handleSignUpButton = () => {
    if (password === confirmPassword) {
      const data = {
        username: userName,
        email: email,
        password: password,
        isAdmin: isAdmin,
      };
      setError(false);
      signUp(data);
    } else {
      setError("Password does not match!");
      setError(true);
    }

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSignUpButton(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-10 bg-blue-100 px-20 py-10 rounded-md">
        {error ? (
          <div className="bg-red-400 p-1 text-white rounded-md">
            Password does not match!
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col space-y-3">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            name="username"
            id="username"
            type="text"
            value={userName}
            onChange={handleInput}
            className="border-2 border-gray-400 rounded-lg p-1 bg-gray-200"
          ></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
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
        <div className="flex flex-col space-y-3">
          <label htmlFor="password" className="text-lg font-medium">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleInput}
            className="border-2 border-gray-400 rounded-lg p-1 bg-gray-200"
          ></input>
        </div>
        <div className="flex flex-row space-x-3">
          <label htmlFor="password" className="text-lg font-medium">
            Is Admin
          </label>
          <input
            checked={isAdmin}
            type="radio"
            name="isAdmin"
            id="isAdmin"
            value={isAdmin}
            onClick={handleInput}
          />
        </div>
        <div>
          <button
            onClick={handleSignUpButton}
            disabled={!signUpButton}
            className={` ${
              !signUpButton ? "bg-gray-400" : ""
            } text-lg text-white bg-blue-600 p-2 rounded-lg`}
          >
	  {signUpButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
