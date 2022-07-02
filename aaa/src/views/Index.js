import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle
} from "reactstrap";
import api from '../Url_api';
import axios from 'axios';
import Header from "../components/Headers/Header.js";


class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      data:[],
      stock: null,
      table:0,
      bill:null,
      bill_detail:[],
      date:null,
      time:null
    };

    this.chooseTable = this.chooseTable.bind(this);
   
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  componentDidMount(){
    setInterval( () => {
      this.loadTable(api('getTable'));
  },1000)
    
  }
  
  loadTable(api){
    axios.get(api)
    .then(res => {
      const data = res.data.data; 
      this.setState({ data:data });
      
    })

  }

  chooseTable(table){
    this.setState({
      table:table
    })
    axios.post(api('getBillIDLast'), 
    JSON.stringify({
      'table':table
    }))
    .then(res => {
     if(res.data.length != 0){
       this.setState({
         bill:res.data[0].b_id
       })
       axios.post(api('getBillByID'), 
       JSON.stringify({
         'bill_id':res.data[0].b_id
       }))
       .then(res => {
          this.setState({bill_detail:res.data.data[0],date:res.data.date,time:res.data.time})
       })
     }else{
        this.setState({bill:null})
     }
      
    })
  }

  back=()=>{
    this.setState({table:0})
  }

  payment = () =>{

    axios.post(api('checkOrderBeforeCheckBill'), 
        JSON.stringify({
            'table_id' : this.state.table
        }))
        .then(res => {
         
          if(res.data != 1){

            axios.post(api('changeStatusBill1'), 
            JSON.stringify({
              'bill_id':this.state.bill_detail.b_id
            }))
            .then(res => {
              if(res.data == 1){
                this.props.history.push('/admin/bill');
              }
              
            })

          }/**/ 
         
        });
   
   
  }


  render() {
    return (
      <>
        <Header />
       
      
        <Container className="mt--7" fluid>
      
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow" style={{backgroundColor:"#f4f5f7",padding:"80px"}}>
              {this.state.table == 0 ? 
              <div>
              <center><h2>สถานะโต๊ะ</h2></center>
              <Row>
              { this.state.data.map(data =>
                <Col lg="6" xl="4" style={{marginTop:"15px"}}>
                  <Card className="card-stats mb-4 mb-xl-0" onClick={this.chooseTable.bind("test",data.t_number)}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            โต๊ะที่ {data.t_number}
                          </CardTitle>
                          <span className="text-muted mb-0">
                            สถานะ {data.t_status == "ready" ? <span className="text-danger mr-2">
                                                            
                                                              ว่าง
                                                            </span>
                                                            :<span className="text-success mr-2">
                                                              
                                                              ใช้งาน
                                                              </span>
                                                            }
                                                            
                          </span>
                        </div>
                        <Col className="col-auto">
                        {data.t_status == "unready" ? <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                                      <i className="ni ni-check-bold" />
                                                    </div>
                                                          :<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                          <i className="ni ni-fat-remove" />
                                                        </div>
                                                          }
                          
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
              )}
              </Row>  
              </div>
              :
              <div>
                <center><h2>โต๊ะที่{" "+this.state.table}</h2></center>
                { this.state.bill != null ?
                  <div>
                    <table className="table table-borderless">
                    
                    <tbody>
                      <tr>
                        <th width="100">รหัสบิล</th>
                        <td>{this.state.bill_detail.b_id}</td>
                      </tr>
                    
                      <tr>
                      <th width="100">วันที่</th>
                      <td>{this.state.date}</td>
                      
                      </tr>
                      <tr>
                      <th width="100">เวลา</th>
                      <td>{this.state.time}</td>
                      
                      </tr>
                      <tr>
                      <th width="100">จำนวน ( คน )</th>
                      <td>{this.state.bill_detail.b_amount_people}</td>
                      
                      </tr>
                    </tbody>
                  </table>

              <Button color="default" type="button" style={{width:"100px"}} onClick={this.back}>
                ย้อนกลับ
              </Button>

              <Button color="success" type="button" style={{width:"100px"}} onClick={this.payment}>
                ชำระเงิน
              </Button>
                  </div>
                  
                :<div><center><h1 style={{color:"red",marginTop:"100px",marginBottom:"100px"}}>ว่าง</h1></center>
                <Button color="default" type="button" style={{width:"100px"}} onClick={this.back}>
                ย้อนกลับ
                </Button></div>
                }
             
              </div>
              
              }
              
              </Card>
              
            </Col>
          
          </Row>
          
        </Container>
         
        
      </>
    );
  }
}

export default Index;
