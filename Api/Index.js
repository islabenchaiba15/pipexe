import axios from "axios";

const API=axios.create({baseURL: 'http://localhost:3000'})
export const SignIn =(formData)=>API.post('users/signin',formData)
export const SignUp =(formData)=>API.post('users/signUp',formData)

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // Replace with your backend URL
    withCredentials: true, 
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },// Allow sending and receiving cookies
  });