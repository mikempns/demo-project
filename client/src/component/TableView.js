import { Form, Table } from 'antd';
import { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import UrlApi from '../Url_api';
import axios from 'axios';

const TableView = ({chooseDay , dataChange , select , onChangeFormTableView ,editFormTableView}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadData, setLoadData] = useState(true);
  const [oldChooseDay, setOldChooseDay] = useState()
  const [income, setIncome] = useState();
  const [expense, setExpense] = useState();

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
        var income = 0;
        var expense = 0;
        for (let i = 0; i < res.data.data.length ; i++) {
          if(select !== 'All'){
            if(res.data.data[i].date === chooseDay && res.data.data[i].type === select){
              if(res.data.data[i].type === "Income"){
                income+=res.data.data[i].amount;
              }
              if(res.data.data[i].type === "Expense"){
                  expense+=res.data.data[i].amount;
              }
              originData.push({
                item: a,
                id:res.data.data[i]._id,
                list: res.data.data[i].list,
                Income: res.data.data[i].type === "Income" ?   <CheckOutlined /> : "",
                Expense: res.data.data[i].type === "Expense" ? <CheckOutlined /> : "",
                amount: res.data.data[i].amount,
              });
              a++;
            }
          }else{
            if(res.data.data[i].date === chooseDay){
              if(res.data.data[i].type === "Income"){
                income+=res.data.data[i].amount;
              }
              if(res.data.data[i].type === "Expense"){
                  expense+=res.data.data[i].amount;
              }
              originData.push({
                item: a,
                id:res.data.data[i]._id,
                list: res.data.data[i].list,
                Income: res.data.data[i].type === "Income" ? <CheckOutlined /> : "",
                Expense: res.data.data[i].type === "Expense" ? <CheckOutlined /> : "",
                amount: res.data.data[i].amount,
              });
              a++;
            }
          }
        }
        setIncome(income);
        setExpense(expense);
        setLoading(false);
        setData(originData);
      });
      onChangeFormTableView(false);
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
      onRow={(record) => {
        return {
          onClick: event => {editFormTableView(record)},
        };
      }}
        loading={loading}
        size="small"
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        rowKey="item"
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Income  {income}  bath  Expense  {expense}   bath</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}  
      />
    </Form>
  );
};

export default TableView;