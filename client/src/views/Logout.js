import {  Navigate } from "react-router-dom";
import React, { useState , useEffect } from 'react';

const Logout = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
   localStorage.removeItem('user');
   setRedirect(true);
  });

  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to='/login' />
    }
  }

  return (
    <div>
      {renderRedirect()}
    </div>
  );
};

export default Logout;