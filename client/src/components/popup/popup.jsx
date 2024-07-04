// PopupComponent.jsx

import React from 'react';
import './popup.css'; // Import CSS for styling

const PopupComponent = ({ onConfirm, onCancel, actionText }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <p>{`Are you sure you want to ${actionText}?`}</p>
        <div className="cta-btns">
          <button className="confirm" onClick={onConfirm}>
            Yes, <span>{actionText}</span>
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;