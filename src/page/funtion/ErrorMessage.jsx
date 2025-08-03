import React from 'react';
import '../../style/ErrorMessage.css';

const ErrorMessage = ({ 
  title = "Đã xảy ra lỗi", 
  message = "Vui lòng thử lại sau", 
  onRetry = null, 
  retryText = "Thử lại",
  type = "error", // error, warning, info
  showIcon = true,
  className = ""
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'error':
      default:
        return '❌';
    }
  };

  return (
    <div className={`error-message-container ${type} ${className}`}>
      <div className="error-content">
        {showIcon && (
          <div className="error-icon">
            {getIcon()}
          </div>
        )}
        
        <div className="error-text">
          <h2 className="error-title">{title}</h2>
          <p className="error-description">{message}</p>
        </div>
      </div>
      
      {onRetry && (
        <div className="error-actions">
          <button 
            className="retry-button"
            onClick={onRetry}
          >
            <span className="retry-icon">🔄</span>
            {retryText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;