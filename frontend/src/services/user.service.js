
import axios from "axios";
import data from "../data/data.json";
//tested
export async function getLabels(setLabels) {
 try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get('http://localhost:8080/labels', {withCredentials: true,});
    setLabels(response.data.labels)
   // Log the response data and status code
    console.log('Response Data:', response.data.labls);
    console.log('Status Code:', response.status);
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
}

export async function getImages(data, setImages, page = 1) {
  // try {
  //   const images = data.Images;
  //   setImages(prev => [...prev, ...images]);
  // } catch (err) {
  //     if (err.response){
  //       console.log(err.response.data.message)
  //     }else{
  //       console.log(err.message)
  //     }
  // }
  try {
    // Make the POST request using axios
    console.log(page)
    if(page === 1){
      const response = await axios.post('http://localhost:8080/images', data, {withCredentials: true,});
      setImages(response.data.images)
      console.log(response.data.images)
      
    }else{
      const response = await axios.post('http://localhost:8080/images', data, {
          params: {
            page: page,
         },
        withCredentials: true,
      });
      console.log(response.data.images)
      setImages(prev => [...prev, ...response.data.images])
    }
    
   // Log the response data and status code
  //  console.log(response.data.images)
  
  //   console.log('Response Data:', response.data);
  //   console.log('Status Code:', response.status);
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
}

export async function assignLabels(data) {
  try {
    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/add-labels', data, {withCredentials: true,});

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

export async function removeLabels(data) {
  try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/remove-labels', data, {withCredentials: true,});

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

//tested
export async function createLabels(data) {
    try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/labels', data, {withCredentials: true,});

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

//tested
export async function deleteLabels(data) {
  try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post('http://localhost:8080/delete-labels', data, {withCredentials: true,});

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

export async function uploadFiles(data) {
 
    try {
      const response = await axios.post('http://localhost:8080/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials :  true,
      });

      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading files', error);
    }
}