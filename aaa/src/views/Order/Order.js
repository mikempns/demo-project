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
  
  
import Header from "../../components/Headers/Header";
import ShowDetail from './ShowDetail';
import StatusMenulist3 from './StatusMenulist3';

class Order extends React.Component{

    constructor(){
        super();
        this.state = {
            data : [],
            order_detail : null
        
        }

        this.selectOrder = this.selectOrder.bind(this);
        this.backToOrder = this.backToOrder.bind(this);
        this.confirmorder = this.confirmorder.bind(this);
      
    }

    componentDidMount(){
      setInterval( () => {
        axios.get(api('getOrderByID'))
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
    },1000)
    }

    selectOrder(o_id){
      this.setState({
        order_detail:o_id
      })
      
    }

    backToOrder(){
      this.setState({
        order_detail:null
      })
    }

    confirmorder(order){
      axios.post(api('confirmorder'), 
    JSON.stringify({
      'order_id':order
    }))
    .then(res => {
      if(res.data == 1){
        this.setState({
          order_detail:null,
          data:[]
        })
      }
      
    })
      
    }

    render(){
        return(
            <> 
             <Header />
       
        { this.state.order_detail == null ?
        <Container className="mt--7" fluid>
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">รายการที่สั่ง</h3>
                    </div>
                    
                  </Row>
                </CardHeader>
               
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">โต๊ะ</th>
                      <th scope="col">วันที่และเวลา</th>
                      <th scope="col">ดูรายการ</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.data.map(data =>
                    <tr>
                      <th scope="row">{data.o_table}</th>
                      <td>{data.o_time}</td>
                      <td>
                      <div className="col">
                        <button type="button" class="btn btn-info" onClick={this.selectOrder.bind("Undata", data.o_id)}><i className="fas fa-eye"/></button>
                        <StatusMenulist3 order={data.o_id}/>
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
        :<ShowDetail confirmorder={this.confirmorder} backToOrder={this.backToOrder} order_id={this.state.order_detail}/>
        }
      </>
           
        )
    }
}export default Order;
