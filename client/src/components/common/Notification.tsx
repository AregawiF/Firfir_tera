import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div className="fixed top-5 left-5 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
      {message}
    </div>
  );
};

export default Notification;
