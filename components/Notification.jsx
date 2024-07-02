// components/Notification.jsx
import { useNotifications } from '../context/NotificationContext';

const Notification = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
      <style jsx>{`
        .notification-container {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          max-height: 100vh;
          overflow-y: auto;
          z-index: 1000;
        }
        .notification {
          background: #444;
          color: #fff;
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Notification;
