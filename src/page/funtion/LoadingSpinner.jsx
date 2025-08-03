import React from 'react';
import '../../style/LoadingSpinner.css';

const LoadingSpinner = ({ 
  message = "Đang tải...", 
  size = "medium",
  color = "primary" 
}) => {
  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${size} ${color}`}>
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;