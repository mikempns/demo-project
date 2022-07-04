import { UserOutlined ,LogoutOutlined } from '@ant-design/icons';
import { Button, Layout , Dropdown, Menu, Space, DatePicker, Select } from 'antd';
import { Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import moment from 'moment';
import UrlApi from '../Url_api';
import axios from 'axios';
import CollectionCreateForm from '../component/CollectionCreateForm';
import TableView from '../component/TableView';
import CardItem from '../component/CardItem';

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
  const [mode, setMode] = useState();
  const [dataEdit, setDateEdit] = useState([]);
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

  const onCreate = (values,id) => {
    if(mode === 'Add'){
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
            setVisible(false);
            setMode('');
            setDataChange(true);
          }else{ 
            console.log("false")
          }
      })
    }else if(mode === 'Edit'){
      const data = {
        'list' : values.list,
        'type' : values.type,
        'amount' : values.amount,
        'date' : values.date.format('YYYY/MM/DD'),
        'user' : localStorage.getItem('user')
      }
      axios.put(UrlApi('editCashBookByUser')+id, data)
        .then(res => {
          if(res.data.result === "success"){
            setVisible(false);
            setDateEdit([]);
            setMode('');
            setDataChange(true);
          }else{ 
            console.log("false")
          }
      })
      
    }
  };

  const deleteItem = (id) => {
    axios.delete(UrlApi('deleteCashBook')+id)
        .then(res => {
          if(res.status === 204){
            setVisible(false);
            setDateEdit([]);
            setMode('');
            setDataChange(true);
          }else{ 
            console.log("false")
          }
      })
  };
  
  const onChangeFormTableView = (values) => {
    setDataChange(values)
  };

  const editFormTableView = (values) => {
    setMode('Edit');
    const data = {
      'id': values.id,
      'list': values.list,
      'type': values.Income !== '' ? 'Income' : 'Expense',
      'amount': values.amount,
      'date': day
    }
    setDateEdit(data);
    setVisible(true);
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
      <div id='CardItem'>
        <CardItem/>
      </div>
      <div className="site-layout-content">
      <div className='content-top'>
      <Button
        type="primary"
        onClick={() => {
          setMode('Add');
          setVisible(true);
        }}
        style={{marginRight:30}}
      >
        Add
      </Button>
      <CollectionCreateForm
        mode={mode}
        dataEdit={dataEdit}
        visible={visible}
        deleteItem={deleteItem}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          setDateEdit([]);
          setMode('');
        }}
      />
      
      <Select
      defaultValue="All"
      style={{
        width: 120,
        marginRight:30
      }}
      onChange={handleChange}
    >
      <Option value="All">All</Option>
      <Option value="Income">Income</Option>
      <Option value="Expense">Expense</Option>
    </Select>
      <DatePicker format={dateFormat} defaultValue={moment()} onChange={(date ,dateString) => handleDatePickerChange(date,dateString,1)}/>
      </div>
      <TableView chooseDay={day} dataChange={dataChange} select={select} onChangeFormTableView={onChangeFormTableView} editFormTableView={editFormTableView}/>
      </div>
    </Content>
    <Footer id="footer" style={{ textAlign: 'center',marginTop:101}}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
};

export default Home;