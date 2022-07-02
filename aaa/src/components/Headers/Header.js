import React from "react";
import axios from 'axios';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import api from '../../Url_api';

class Header extends React.Component {

  constructor(){
    super();
    this.state= {
      food: 0,
      category: 0,
      order:0,
      bill:0,
      curTime : null
    }
  }

  componentDidMount(){
  
    axios.get(api('getRowfood'))
    .then(res => {
      const food = res.data[0].num;
      this.setState({ food });
     
      
    })

    axios.get(api('getRowcategory'))
    .then(res => {
      const category = res.data[0].num;
      this.setState({ category });
     
      
    })

    axios.get(api('getRowOrder'))
    .then(res => {
      const order = res.data[0].num;
      this.setState({ order });
     
      
    })

    axios.get(api('getRowBill'))
    .then(res => {
      const bill = res.data[0].num;
      this.setState({ bill });
     
      
    })
  }


  render() {
    return (
      <>
        <div className="header bg-gradient-warning pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body"  style={{marginTop:"-50px",marginBottom:"-50px"}}>
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            รายการสั่งอาหาร
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.order}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="ni ni-single-copy-04" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            รายการชำระเงิน
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.bill}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fa fa-credit-card" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            ประเภทอาหาร
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.category}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-collection" />
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            เมนูอาหาร
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.food}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-utensils" />
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
