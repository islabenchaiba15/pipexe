import { createContext, useContext, useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';
import { useAuth } from './AuthContext';
const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  useEffect(() => {

    // Connect to the socket.io server
    const socket = io('http://localhost:8080');

    // Listen for 'notification' event from the server
    socket.on('notification', (message) => {
      console.log("Received notification:", message); // Debugging
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    return () => {
      // Cleanup the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log('islqqqqqqqqqqqqqqqqqqm')
        // Fetch all notifications
        const response = await axios.get(`http://localhost:8080/notifications/user/${user._id}`);
        console.log("Fetched notifications:", response.data); // Debugging
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications', error.message);
      }
    };

    fetchNotifications();
  }, []);

  console.log('Notifications:', notifications); // Debugging notifications

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
