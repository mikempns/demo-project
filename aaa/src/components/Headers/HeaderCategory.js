import React from "react";
import { Card,
  CardHeader, 
  CardBody,
  CardTitle,
  Container, 
  Row, 
  Col, 
  Form,
  FormGroup,
  Button,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,} from "reactstrap";


class HeaderCategory extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-warning pb-8 pt-5 pt-md-8">
          <br/><br/>
        <Container className="mt--7" fluid>
        
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
               
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      เพิ่มประเภทอาหาร
                    </h6>
                    <Col lg="6">
                    <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              ประเภทอาหาร
                            </label>
                            </Col>
                    <div className="pl-lg-4">
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              id="input-category"
                              placeholder="ประเภทอาหาร"
                              type="text"
                            />
                          </FormGroup>
                          
                        </Col>
                        
                        <Col lg="4">
                          <FormGroup className="align-items-center d-none d-md-flex">
                              <Button className="btn-icon btn-3" color="primary" type="button">
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add" />
                              </span>
                              <span className="btn-inner--text">เพิ่ม</span>
                              </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  
                   
                  </Form>
                </CardBody>
              </Card>
            </Col>
        </Container>
        </div>
      </>
    );
  }
}

export default HeaderCategory;
