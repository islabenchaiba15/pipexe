"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/Api/Index";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodeTokenAndSetUser = async () => {
      console.log("jwtDecode:", jwtDecode);
      const cookies = document.cookie.split("; ");
      console.log("All cookies:", cookies);
  
      const jwtCookie = cookies.find((row) => row.startsWith("jwt="));
      console.log("JWT cookie:", jwtCookie);
  
      const token = jwtCookie?.split("=")[1];
      console.log("Extracted token:", token);
  
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken);
          const currentTime = Math.floor(Date.now() / 1000);
          console.log("Token expiration:", decodedToken.exp);
          console.log("Current time:", currentTime);
          console.log("Time until expiration:", decodedToken.exp - currentTime);
  
          if (decodedToken.exp > currentTime) {
            console.log("Token is still valid");
            try {
              const response = await axiosInstance.get(`/auth/${decodedToken.id}`);
              setUser(response.data.user);
              console.log("User set:", response.data.user);
            } catch (error) {
              console.error("Error fetching user data:", error);
              setUser(null);
            }
          } else {
            console.log("Token has expired");
            setUser(null);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          setUser(null);
        }
      } else {
        console.log("No token found");
        setUser(null);
      }
    };
  
    decodeTokenAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
