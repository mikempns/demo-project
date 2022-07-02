import React from 'react';
import classnames from "classnames";
import ReactDatetime from "react-datetime";
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
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    TabPane
  } from "reactstrap";
import axios from 'axios'; 
import api from '../../Url_api';
import DatePicker from "react-datepicker";
import {  format } from 'date-fns'

  
  
import Header from "../../components/Headers/Header";
class Showbill extends React.Component{

    constructor(){
        super();
        this.state = {
            tabs: 1,
            bill : [],
            receipt:null,
            bill_id:null,
            startDate: new Date(),
            amount:0,
            price:0,
            bill_chart:[]
        }


      
    }



    componentDidMount(){
    
        const date = format(new Date(this.state.startDate), 'yyyy-MM-dd');
        
          axios.post(api('getBillStatusMakepaymentDate'), 
          JSON.stringify({
            'date':date
          }))
          .then(res => {
           
            const bill = res.data; 
            this.setState({ 
              bill :bill
            });
          })

          axios.post(api('getBillDayChart'), 
          JSON.stringify({
            'date':date
          }))
          .then(result => {
           
            const bill = result.data; 
            this.setState({ 
              bill_chart :bill
            });
          })
    
    }

   
  

    handleChange = date => {
      this.setState({
        startDate:date
        
      })
      const date1 = format(new Date(date), 'yyyy-MM-dd');
        
      axios.post(api('getBillStatusMakepaymentDate'), 
      JSON.stringify({
        'date':date1
      }))
      .then(res => {
        
        
       if(res.data[0] != undefined){
        
        const bill = res.data;  
        this.setState({ 
          bill :bill,
          price:res.data[0].b_price
        });

        axios.post(api('getBillDayChart'), 
          JSON.stringify({
            'date':date1
          }))
          .then(result => {
           
            const bill = result.data; 
            this.setState({ 
              bill_chart :bill
            });
          })
      }else{
       
        this.setState({bill: []})
      }
      })
    };
    toggleNavs = (e, state, index) => {
      e.preventDefault();
      this.setState({
        [state]: index
      });
    };


    render(){
     

        return(
            <>
             <Header />
        {/* Page content */}
       
        <Container className="mt--7" fluid>
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
              <div className="nav-wrapper">
          <Nav
            // className="nav-fill flex-column flex-md-row" เพื่อให้กล่องเล็กลง
            style={{marginRight:"100px"}} // ทำให้ห่างจากขอบด้านขวา 100 px
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <div className="col">
                <h3 className="mb-0">ยอดขาย</h3>
            </div>
            
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
                <i className="ni ni-cloud-upload-96 mr-2" />
                วันที่
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
                <i className="ni ni-bell-55 mr-2" />
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
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <p className="description">
                <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    inputProps={{
                      placeholder: "Date Picker Here"
                    }}
                    Datetime dateFormat="DD/MM/YYYY" timeFormat={false}
                    defaultValue={this.state.startDate} //selected ค่าเริ่มต้นเก่า defaultValue ค่าเริ่มต้นใหม่
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </FormGroup>
                </p>
                
              </TabPane>
              <TabPane tabId="tabs2">
                <p className="description">
                  Cosby sweater eu banh mi, qui irure terry richardson ex
                  squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi qui.
                </p>
              </TabPane>
              <TabPane tabId="tabs3">
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth.
                </p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    
                    
                  </Row>
                </CardHeader>
                {this.state.bill[0] != undefined ?
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">โต๊ะ</th>
                      <th scope="col">วันที่และเวลา</th>
                      <th scope="col">จำนวน (คน)</th>
                      <th scope="col">ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.bill.map(bill =>
                    <tr>
                      <th scope="row">{bill.b_table}</th>
                      <td>{bill.b_date}</td>
                      <td>{bill.b_amount_people}</td>
                      <td>
                        
                        {bill.b_amount_people*bill.b_price}
                     
                      </td>
                    </tr>
                  )}

                  <tr>
                      <th scope="row"></th>
                      <td></td>
                      <td>ราคารวม</td>
                      <td>
                        {this.state.bill.reduce((totalAmount, data) => totalAmount + parseInt(data.b_amount_people), 0)*this.state.price}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                :<center><h1 style={{marginTop:"80px",marginBottom:"80px"}}>ไม่พบข้อมูล !</h1></center>}
              </Card>
            </Col>
           
          </Row>
        
          
        </Container>
       
      </>
           
        )
    }
}export default Showbill;
