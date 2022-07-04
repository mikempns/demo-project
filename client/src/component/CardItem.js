import { Card, Col, Row } from 'antd';
import React, { useState, useEffect} from 'react';
import UrlApi from '../Url_api';
import axios from 'axios';

const CardItem = () => {
    const [income, setIncome] = useState();
    const [expense, setExpense] = useState();
    const [balance, setBalance] = useState();

    useEffect(() => {
        var user = localStorage.getItem('user');
        axios.post(UrlApi('getCashBookByUser'), {'user': user})
        .then(res => {
            var income = 0;
            var expense = 0;
            for (let i = 0; i < res.data.data.length ; i++) {
                if(res.data.data[i].type === "Income"){
                    income+=res.data.data[i].amount;
                }
                if(res.data.data[i].type === "Expense"){
                    expense+=res.data.data[i].amount;
                }
            }
            setIncome(income);
            setExpense(expense);
            setBalance(income-expense);
        });
     
    });

    return(
        <div className="site-card-wrapper">
            <Row gutter={18} style={{alignItems:'center',justifyContent: 'center'}}>
                <Col span={6} style={{padding: '50px'}}>
                    <Card title="Total Income" bordered={false}>
                        <center>{income}</center>
                    </Card>
                </Col>
                <Col span={6} style={{padding: '50px'}}>
                    <Card title="Total Expense" bordered={false}>
                        <center>{expense}</center>
                    </Card>
                </Col>
                <Col span={6} style={{padding: '50px'}}>
                    <Card title="Net Balance" bordered={false}>
                        <center>{balance}</center>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default CardItem;