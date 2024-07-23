import axios from 'axios';

export const getAllTasks = async (timeframe) => {
    console.log(localStorage.getItem('token'))

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
   
    console.log(timeframe)

  try {
    const headers = {
      Authorization: token,
    };
    const response = await axios.get(`http://localhost:3000/api/tasks?filter=${timeframe}`,{headers});
    return response; // Return only data from the response
  } catch (error) {
   
    return error;
  }
};
