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
                                <button class="btn btn-info" disabled><i className="fas fa-check"/></button>
                                :
                                <button class="btn btn-danger" disabled><i class="fa fa-times" aria-hidden="true"></i></button>
                                }
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                <center>
                <div className="col">
                <button className="btn btn-default" onClick={this.props.backToOrder}>ย้อนกลับ</button>
    
                

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