/* REACT */
import { createContext } from "react";

/* LIBRARIES */
import AxiosAPI from "axios";
import toast from "react-hot-toast";

/* APP */
import { config } from "@app/config";


const axios = AxiosAPI.create({
  baseURL: config.url.api,
  headers: { 
    'Content-Type': 'application/json',
    // Clean the axios cache by default
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  withCredentials: true,
});

//Component
export const AxiosContext = createContext(axios);

axios.interceptors.request.use(
  config => config,
  error => {
    Promise.reject(error.response || error.message);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const httpStatus = error?.response?.status || 0;

    /* HTTP status is 401 NOT AUTHENTICATED -> Logout from application */
    if( httpStatus === 401 ) {
      console.log(error?.response)
      toast.error("The session is expired, please log in to continue");
    }
    
    return Promise.reject(error?.response || error?.message);
  }
);

export const AxiosProvider = ( { children } : { children: React.ReactNode } ) => {

  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  )
}
