import axios from "axios";



const path = "http://localhost:8080/"

export async function validateUser() {
    try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get(path + 'valid-user', {withCredentials: true,});

   // Log the response data and status code
    console.log('Response Data:', response.data);
    console.log('Status Code:', response.status);
    return true
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
      return false
  }
}

export async function validateAdmin() {
    try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get(path + 'valid-admin', {withCredentials: true,});

   // Log the response data and status code
    console.log('Response Data:', response.data);
    console.log('Status Code:', response.status);
    return true
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
      return false
  }
}
export async function login(data, setLoginButtonText) {
   try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post(path + 'login', data, {withCredentials: true,});

   // Log the response data and status code
    console.log('Response Data:', response.data.message);
	setLoginButtonText(response.data.message);
    console.log('Status Code:', response.status);
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
}
export async function logout(setLogoutButtonText) {
   try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get(path + 'logout', {withCredentials: true,});

   // Log the response data and status code
    console.log('Response Data:', response.data);
    console.log('Status Code:', response.status);
	setLogoutButtonText("Logged Out Successfully")
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
}

export async function signUp(data) {
  try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post(path + 'signup', data, {withCredentials: true,});

   // Log the response data and status code
    console.log('Response Data:', response.data);
    console.log('Status Code:', response.status);
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
}
