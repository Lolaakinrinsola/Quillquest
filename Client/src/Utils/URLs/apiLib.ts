import { AxiosRequestHeaders } from "axios";
import { endPointlistTypes } from "./types";

let headers = {
    'Content-Type': 'application/json',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;

let FileHeaders = {
    'Content-Type': 'multipart/form-data',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;

export const endPoints: endPointlistTypes  = {
     //Authentication
     loginUser: {
        url: '/users/login',
        method: 'POST',
        headers: headers,
    },
     signUpUser: {
        url: '/users/signup',
        method: 'POST',
        headers: FileHeaders,
    },
    createBlog:{
        url: '/blogs',
        method: 'POST',
        headers: FileHeaders,
        auth:true
    },
    allBlogs:{
        url: '/blogs',
        method: 'GET',
        headers: headers,
        auth:true
    }
}