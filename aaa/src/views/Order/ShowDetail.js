import React from 'react';
import { Card,CardHeader,Table, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";
import axios from 'axios'; 
import api from '../../Url_api';

class ShowDetail extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      detail:[],
      all:0,
      have:0
    }
    this.choosefood = this.choosefood.bind(this);
  }

  componentDidMount(){
    setInterval( () => {
    const order_id = this.props.order_id;
    
    axios.post(api('getDetailOrderbyID'), 
    JSON.stringify({
      'order_id':order_id
    }))
    .then(res => {
      const detail = res.data; 
      this.setState({ detail });
    })

    axios.post(api('getNumberOrder'), 
    JSON.stringify({
        'order_id' : order_id
    }))
    .then(res => {
  
  this.setState({
      all:res.data.all[0].row_count,
      have:res.data.have[0].num_status
  })
})
    },1000)
    
  }
  Comfirmorderall = () => {
    const order_id = this.props.order_id;
    axios.post(api('confirmorderall'), 
    JSON.stringify({
      'order_id':order_id
    }))
    
  }

  onConfirmClick = () => {
    const order = this.state.detail[0].od_id;
    this.props.confirmorder(order);
  }

  choosefood(f_id){
    const order_id = this.props.order_id;
    
    axios.post(api('changeStatusOrderDetail'), 
    JSON.stringify({
      'order_id':order_id,
      'f_id':f_id
    }))
    
  }

  
    render(){
        return(
            <>
           
           <Container className="mt--7" fluid>
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
        <h3 className="mb-0">รายละเอียดรายการที่สั่ง รหัสออเดอร์ {this.props.order_id}</h3>
                    </div>
                    
                  </Row>
                </CardHeader>
               
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      <th></th>
                      <th scope="col">รายการ</th>
                      <th scope="col">จำนวน</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.detail.map(detail =>
                    <tr>
                      <td></td>
                      <td></td>
                      <th scope="row">{detail.f_name}</th>
                      <td>{detail.od_amount}</td>
                      <td>
                      { detail.od_status != 'กำลังเตรียม' ? 
                                <button class="btn btn-success" ><i className="ni ni-check-bold"/></button>
                                :
                                <button class="btn btn-danger" onClick={this.choosefood.bind("Undata", detail.od_f_id)}><i className="ni ni-fat-remove"/></button>
                                }
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                <center>
                <div className="col">
                <button className="btn btn-default" onClick={this.props.backToOrder}>ย้อนกลับ</button>
                {
                  this.state.all != this.state.have ?
                  <button className="btn btn-primary" >ยืนยัน</button>
                  :<button className="btn btn-success" onClick={this.onConfirmClick}>ยืนยัน</button>
                }
                 {
                  this.state.all != this.state.have ?
                  <button className="btn btn-primary" onClick={this.Comfirmorderall}>ยืนยันทั้งหมด</button>
                  :<button className="btn btn-success" >ยืนยันทั้งหมด</button>
                 }
                </div>
                </center>
              </Card>
            </Col>
           
          </Row>
        
          
        </Container>  
            </>
        )
    }
}
export default ShowDetail;