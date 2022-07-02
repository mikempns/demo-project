import React from 'react';
import {
    Button,
    Card,
    CardTitle,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
  } from "reactstrap";
import axios from 'axios'; 
import api from '../../Url_api';
import ReactToPrint from "react-to-print";
import Detail from './Detail';
  
  
import Header from "../../components/Headers/Header";
import Receipt from './Receipt';
class Showbill extends React.Component{

    constructor(){
        super();
        this.state = {
            bill : [],
            receipt:null,
            bill_id:null
        }

        this.selectbill = this.selectbill.bind(this);
        this.backTobill = this.backTobill.bind(this);
        this.payment = this.payment.bind(this);
    }

    componentDidMount(){
      setInterval( () => {
        axios.get(api('getBillStatusMakepayment'))
      .then(res => {
        const bill = res.data;
        this.setState({ bill });
      })
    },1000)
    }

    selectbill(id){
      this.setState({
        bill_id:id
      })
      
    }

    backTobill(){
      this.setState({
        bill_id:null
      })
    }

    payment(bill_id,table){
     // console.log("bill "+table);
      
    axios.post(api('changeStatusBill2'), 
    JSON.stringify({
      'bill_id':bill_id,
      'table_id':table
    }))
    }


    render(){
        return(
            <>
             <Header />
        {/* Page content */}
        { this.state.bill_id == null ?
        <Container className="mt--7" fluid>
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">รายการชำระเงิน</h3>
                    </div>
                    
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">โต๊ะ</th>
                      <th scope="col">วันที่และเวลา</th>
                      <th scope="col">จำนวน (คน)</th>
                      <th scope="col">ดูใบเสร็จ/พิมพ์ใบเสร็จ</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.bill.map(bill =>
                    <tr>
                      <th scope="row">{bill.b_table}</th>
                      <td>{bill.b_date}</td>
                      <td>{bill.b_amount_people}</td>
                      <td>
                      <div className="col">
                        <button type="button" class="btn btn-info" onClick={this.selectbill.bind("Undata", bill.b_id)}><i className="fas fa-eye"/></button>
                       
                        <ReactToPrint
                    trigger={() =>  <button type="button" class="btn btn-warning"><i className="fas fa-print"/></button>}
                    content={() => this.componentRef}
                    />
                    <button onClick={this.payment.bind("data", bill.b_id , bill.b_table)} type="button" class="btn btn-success"><i class="fas fa-check"></i></button>
                    <div style={{ display: 'none' }}>
                     <Detail bill={bill.b_id} ref={el => (this.componentRef = el)}/>
                     </div>
                    </div>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Card>
            </Col>
           
          </Row>
        
          
        </Container>
         :<Receipt backTobill={this.backTobill} bill_id={this.state.bill_id}/>
        }
      </>
           
        )
    }
}export default Showbill;
