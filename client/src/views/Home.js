import { UserOutlined ,LogoutOutlined } from '@ant-design/icons';
import { Button, Form, Input , Breadcrumb, Layout , Dropdown, Menu, Space} from 'antd';
import { Link , Navigate } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import UrlApi from '../Url_api';
import axios from 'axios';
import CollectionCreateForm from '../component/CollectionCreateForm';
import TableView from '../component/TableView';

const Home = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState();
  const { Header, Content, Footer } = Layout;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    var user = localStorage.getItem('user');
    setUser(user);   
   });

  const onFinish = (values) => {
    axios.post(UrlApi('login'), values)
    .then(res => {
      if(res.data.result === "true"){
        localStorage.setItem('user', values.username);
        setRedirect(true)
        //console.log("true")
      }else{ 
        //console.log("false")
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

  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <Link to="/logout">Logout</Link>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const onCreate = (values) => {
    const data = {
      'list' : values.list,
      'type' : values.type,
      'amount' : values.amount,
      'date' : values.date.format('YYYY/MM/DD'),
      'user' : localStorage.getItem('user')
    }
    axios.post(UrlApi('save'), data)
      .then(res => {
        if(res.data.result === "success"){
          console.log(res.data.result)
        }else{ 
          console.log("false")
        }
    })
    setVisible(false);
  };

  return (
    <Layout className="layout">
    <Header>
    <Dropdown className="icon-dropdown" overlay={menu}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        <UserOutlined className="site-form-item-icon"/>
         <h3 style={{color:'white'}}>{user}</h3>
      </Space>
    </a>
  </Dropdown>
  
     
    </Header>
    <Content id="content" style={{ padding: '0 60px' }}>
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
      <div className="site-layout-content">
      <TableView/>
      </div>
    </Content>
    <Footer id="footer" style={{ textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
};

export default Home;