import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link , Navigate } from "react-router-dom";
import React, { useState , useEffect } from 'react';

const App = () => {
  const [redirect, setRedirect] = useState(false);
  const [home, sethome] = useState(false);

  useEffect(() => {
   var user = localStorage.getItem('user');
   if(user !== null){
    sethome(true)
    setRedirect(true)
   }else{
    setRedirect(true)
   }
  });

  const renderRedirect = () => {
    if (redirect) {
      if(home){
        return <Navigate to='/home' />
      }else{
        return <Navigate to='/login' />
      }
     
    }
  }

  return (
    <div>
      {renderRedirect()}
    </div>
  );
};

export default App;