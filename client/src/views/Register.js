import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link , Navigate } from "react-router-dom";
import React, { useState } from 'react';
import UrlApi from '../Url_api';
import axios from 'axios';

const Register = () => {
  const [redirect, setRedirect] = useState(false);

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  const onFinish = (values) => {
    axios.post(UrlApi('register'), values)
    .then(res => {
      if(res.data.result === true){
        localStorage.setItem('user', values.username);
        setRedirect(true)
        console.log("true")
      }else{ 
        console.log("false")
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to='/' />
    }
  }

  const onCancel = () => {
    setRedirect(true)
  };

  return (
    <div className="App">
      {renderRedirect()}
      <h1 style={{paddingBottom:"20px"}}>Register</h1>
      <Form
        name="normal_register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
         <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{marginRight:30}}>
        Register
        </Button>
        <Button htmlType="button" onClick={onCancel}>
        Cancel
        </Button>
      </Form.Item>
      </Form>
    </div>
  );
};

export default Register;