import axios from "axios";




export async function validateUser() {
    try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get('http://localhost:8080/valid-user', {withCredentials: true,});

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
    const response = await axios.get('http://localhost:8080/valid-admin', {withCredentials: true,});

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
export async function login(data) {
   try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/login', data, {withCredentials: true,});

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
export async function logout() {
   try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get('http://localhost:8080/logout', {withCredentials: true,});

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

export async function signUp(data) {
  try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/signup', data, {withCredentials: true,});

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
