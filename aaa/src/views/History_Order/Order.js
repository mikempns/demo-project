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
    Col, 
    TabContent,
    TabPane,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup
  } from "reactstrap";
import axios from 'axios'; 
import api from '../../Url_api';
import classnames from "classnames"; 
  
import Header from "../../components/Headers/Header";
import ShowDetail from './ShowDetail';
import StatusMenulist3 from './StatusMenulist3';
import ReactDatetime from "react-datetime";



import {  format } from 'date-fns'
class Order extends React.Component{

    constructor(){
        super();
        this.state = {
            data : [],
            order_detail : null,
            startDate: new Date(),
            detail:[],
            tabs: 1,
            data_chart:[]
        
        }

        this.selectOrder = this.selectOrder.bind(this);
        this.backToOrder = this.backToOrder.bind(this);
        this.confirmorder = this.confirmorder.bind(this);
      
    }

    toggleNavs = (e, state, index) => {
      e.preventDefault();
      this.setState({
        [state]: index
      });
    };

    componentDidMount(){  
    
      const date = format(new Date(this.state.startDate), 'yyyy-MM-dd')
      
      
        axios.post(api('getDateOrder'), 
        JSON.stringify({
          'date':date
        }))
        .then(res => {
          const detail = res.data; 
          this.setState({ detail });
        })

        axios.post(api('getDataChartOrder'), 
        JSON.stringify({
          'date':date
        }))
        .then(res => {
          const data_chart = res.data; 
          this.setState({ data_chart });
        })
    
  
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

    handleChange = date => {
      this.setState({
        startDate: date
      });

      const date1 = format(new Date(date), 'yyyy-MM-dd')
      
      
      axios.post(api('getDateOrder'), 
      JSON.stringify({
        'date':date1
      }))
      .then(res => {
        if(res.data[0] != undefined){
        const detail = res.data; 
        this.setState({ detail });
        axios.post(api('getDataChartOrder'), 
        JSON.stringify({
          'date':date1
        }))
        .then(result => {
          const data_chart = result.data; 
          this.setState({ data_chart });
        })

        }else{
          this.setState({detail:[]})
        }
      })

     
  
    };

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
                      <h3 className="mb-0">ประวัติออเดอร์ทั้งหมด</h3>
                    </div>
                    <div className="nav-wrapper">
          <Nav
            style={{marginRight:"100px"}}
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-calendar-grid-58 mr-2" />
                วัน
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-calendar-grid-58 mr-2" />
                เดือน
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3
                })}
                onClick={e => this.toggleNavs(e, "tabs", 3)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-calendar-grid-58 mr-2" />
                ปี
              </NavLink>
            </NavItem>
          </Nav>
        </div>
                  </Row>
                </CardHeader>
                <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon>
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      defaultValue={this.state.startDate}
                      inputProps={{
                        placeholder: "Date Picker Here"
                      }}
                      timeFormat={false}
                      dateFormat="DD/MM/YYYY"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
              </TabPane>
              <TabPane tabId="tabs2">
               
              </TabPane>
              <TabPane tabId="tabs3">
                
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>

        
        
                { this.state.detail[0] != undefined ? 
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">โต๊ะ</th>
                      <th scope="col">วันที่และเวลา</th>
                      <th scope="col">ดูรายการ</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.detail.map(data =>
                    <tr>
                      <th scope="row">{data.o_table}</th>
                      <td>{data.o_time}</td>
                      <td>
                      <div className="col">
                        <button type="button" className="btn btn-info" onClick={this.selectOrder.bind("Undata", data.o_id)}><i className="fas fa-eye"/></button>
                        <StatusMenulist3 order={data.o_id}/>
                    </div>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
             :<center><h1 style={{marginTop:"80px",marginBottom:"80px"}}>ไม่พบข้อมูล !</h1></center>}
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
