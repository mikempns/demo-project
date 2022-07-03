import { Form, Table } from 'antd';
import { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import UrlApi from '../Url_api';
import axios from 'axios';

const TableView = ({chooseDay , dataChange , select}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadData, setLoadData] = useState(true);
  const [oldChooseDay, setOldChooseDay] = useState()

  useEffect(() => {
    var user = localStorage.getItem('user');
    if(oldChooseDay !== chooseDay){
      setLoading(true);
      setLoadData(true);
      setOldChooseDay(chooseDay);
    }
    if(loadData || dataChange){
      axios.post(UrlApi('getCashBookByUser'), {'user': user})
      .then(res => {
        const originData = [];
        let a = 1;
        for (let i = 0; i < res.data.data.length ; i++) {
          if(select !== 'All'){
            if(res.data.data[i].date === chooseDay && res.data.data[i].type === select){
              originData.push({
                item: a,
                list: res.data.data[i].list,
                Income: res.data.data[i].type === "Income" ? <CheckOutlined /> : "",
                Expense: res.data.data[i].type === "Expense" ? <CheckOutlined /> : "",
                amount: res.data.data[i].amount,
              });
              a++;
            }
          }else{
            if(res.data.data[i].date === chooseDay){
              originData.push({
                item: a,
                list: res.data.data[i].list,
                Income: res.data.data[i].type === "Income" ? <CheckOutlined /> : "",
                Expense: res.data.data[i].type === "Expense" ? <CheckOutlined /> : "",
                amount: res.data.data[i].amount,
              });
              a++;
            }
          }
          
         
        }
        setLoading(false);
        setData(originData);
      });
      setLoadData(false);
    }
    
   });

  const columns = [
    {
      title: 'item',
      dataIndex: 'item',
      width: '5%',
      align: 'center'
    },
    {
      title: 'name',
      dataIndex: 'list',
      width: '40%',
      align: 'center'
    },
    {
      title: 'type',
      children: [
        {
          title: 'Income',
          dataIndex: 'Income',
          width: 150,
          align: 'center'
        },
        {
          title: 'Expense',
          dataIndex: 'Expense',
          width: 150,
          align: 'center'
        },
      ],
    }, 
    {
      title: 'amount (THB.)',
      dataIndex: 'amount',
      width: '15%',
      align: 'center'
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        loading={loading}
        size="small"
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        rowKey="item"
      />
    </Form>
  );
};

export default TableView;