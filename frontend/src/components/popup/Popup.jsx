import React from 'react';
import './popup.css';

const Popup = ({ message }) => {
  return (
    <div className="popupContainer">
      <div className="popupMessage">
        {message}
      </div>
    </div>
  );
};

export default Popup;
