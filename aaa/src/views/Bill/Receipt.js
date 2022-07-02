import React from 'react';
import { Card,CardHeader,Table, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";
import axios from 'axios'; 
import api from '../../Url_api';
import Detail from './Detail';
import ReactToPrint from "react-to-print";

class Receipt extends React.Component{

  constructor(props){
    super(props);
    this.state ={
    
    }
  }

  componentDidMount(){
   
    
  }

  onConfirmClick = () => {
    const order = this.state.detail[0].od_id;
    this.props.confirmorder(order);
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
        <h3 className="mb-0">รายละเอียดรายการชำระเงิน หมายเลข {this.props.bill_id}</h3>
                    </div>
                    <div className="col text-right">
                    <ReactToPrint
                    trigger={() =>  <Button
                                        color="primary"
                                        size="md"
                                    ><i className="fas fa-print"></i>
                                    {" "}พิมพ์ใบเสร็จ
                                    </Button>}
                                    content={() => this.componentRef}
                    />
                    
                     

                      <Button
                        color="primary"
                        onClick={this.props.backTobill}
                        size="md"
                      >
                       {" "}ย้อนกลับ
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
    
                <Detail bill={this.props.bill_id} ref={el => (this.componentRef = el)}/>
              </Card>
            </Col>
           
          </Row>
        
          
        </Container>  
            </>
        )
    }
}
export default Receipt;