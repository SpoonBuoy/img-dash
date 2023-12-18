
import axios from "axios";
const path = "http://localhost:8080/"
//tested
export async function getLabels(setLabels) {
 try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.get(path + 'labels', {withCredentials: true,});
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
      const response = await axios.post(path + 'images', data, {withCredentials: true,});
      setImages([...response.data.images])
      return response.data.images
     // console.log(response.data.images)
      
    }else{
      const response = await axios.post(path + 'images', data, {
          params: {
            page: page,
         },
        withCredentials: true,
      });
      console.log(response.data.images)
      setImages(prev => [...prev, ...response.data.images])
      return response.data.images
    }
   
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
  return "xx";
}

export async function assignLabels(data, setButtonClicked) {
  try {
    // Make the POST request using axios
    const response = await axios.post(path + 'add-labels', data, {withCredentials: true,});
   // Log the response data and status code
    console.log('Response Data: from assign label', response.data);
    console.log('Status Code:', response.status);
    setButtonClicked(prev => !prev)
  } catch (err) {
      if (err.response){
        console.log(err.response.data.message)
      }else{
        console.log(err.message)
      }
  }
  //setButtonClicked(prev => !prev)
}

export async function removeLabels(data) {
  try {
    //console.log("login >>>", data);

    // Make the POST request using axios
    const response = await axios.post(path + 'remove-labels', data, {withCredentials: true,});

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
    const response = await axios.post(path + 'labels', data, {withCredentials: true,});

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
    const response = await axios.post(path + 'delete-labels', data, {withCredentials: true,});

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

export async function uploadFiles(data, setUploadButtonText) {
 
    try {
      const response = await axios.post(path + 'upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials :  true,
      });

      console.log('Upload successful', response.data);
		  setUploadButtonText("Images Uploaded");
    } catch (error) {
      console.error('Error uploading files', error);
		setUploadButtonText("Failed to Upload Images");
    }
}
