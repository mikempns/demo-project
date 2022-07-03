import { UserOutlined ,LogoutOutlined } from '@ant-design/icons';
import { Button, Layout , Dropdown, Menu, Space, DatePicker, Select } from 'antd';
import { Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import moment from 'moment';
import UrlApi from '../Url_api';
import axios from 'axios';
import CollectionCreateForm from '../component/CollectionCreateForm';
import TableView from '../component/TableView';

const Home = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState();
  const { Header, Content, Footer } = Layout;
  const [visible, setVisible] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const dateFormat = 'YYYY/MM/DD';
  const today = moment().format(dateFormat);
  const [day, setDay] = useState(today);
  const [select, setSelect] = useState('All');
  const { Option } = Select;

  useEffect(() => {
    var user = localStorage.getItem('user');
    setUser(user);
   });

  const handleChange = (value) => {
    setSelect(value);
    setDataChange(true);
  };

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
    setDataChange(true);
  };

  const handleDatePickerChange = (date, dateString, id) => {
    setDay(dateString);
 }

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
      <div className="site-layout-content">
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
      <Select
      defaultValue="All"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="All">All</Option>
      <Option value="Income">Income</Option>
      <Option value="Expense">Expense</Option>
    </Select>
      <DatePicker format={dateFormat} defaultValue={moment()} onChange={(date ,dateString) => handleDatePickerChange(date,dateString,1)}/>
      <TableView chooseDay={day} dataChange={dataChange} select={select}/>
      </div>
    </Content>
    <Footer id="footer" style={{ textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
};

export default Home;