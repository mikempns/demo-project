import React from "react";
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
  Modal
} from "reactstrap";
import api from '../../Url_api';
import axios from 'axios';
import Addcategory from './Addcategory';

import Header from "../../components/Headers/Header";
import Editcategory from "./Editcategory";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      category: [],
      status: '',
      data: [],
      c_id: '',
      defaultModal: false
    };
    this.backToCate = this.backToCate.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentDidMount() {
    axios.get(api('getAllCategory'))
      .then(res => {
        const data = res.data.data;
        this.setState({ data });

      })


  }

  delete(id) {

    axios.post(api('deletecategory'),
      JSON.stringify({
        'c_id': id,

      }))
    this.setState({
      defaultModal: false
    });
    window.location.reload(false);
  }

  edit(id) {
    this.setState({
      c_id: id,
      status: 'edit'
    })

  }

  ChangeAdd = () => {
    this.setState({ status: 'add' })
  }

  backToCate() {
    this.setState({
      status: ''
    })
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">


                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">จัดการประเภทอาหาร</h3>
                    </div>
                    <div className="nav-wrapper">
                      {this.state.status == '' ? <Button className="btn-icon btn-3" color="secondary" type="button" style={{ marginRight: "100px" }} onClick={this.ChangeAdd}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-fat-add" />
                        </span>

                        <span className="btn-inner--text">เพิ่ม</span>

                      </Button> : ""}
                    </div>
                  </Row>
                </CardHeader>



                {this.state.status == 'add' ?
                  <Addcategory backToCate={this.backToCate} />
                  : ""
                }

                {
                  this.state.status == '' ?
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">ประเภทอาหาร</th>
                          <th scope="col">รูปภาพ</th>
                          <th scope="col">แก้ไข / ลบ</th>
                        </tr>
                      </thead>
                      <tbody>

                        {this.state.data.map(data =>
                          <tr>
                            <th scope="row">{data.c_name}</th>
                            <td><img src={data.c_icons} alt={data.c_icons} width={150} height={150}/></td>
                            <td><button onClick={this.edit.bind("Undata", data.c_id)} type="button" class="btn btn-warning"><i class="far fa-edit"></i></button><button onClick={() => this.toggleModal("defaultModal")} type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button></td>
                            <Modal
                              className="modal-dialog-centered"
                              isOpen={this.state.defaultModal}
                              toggle={() => this.toggleModal("defaultModal")}
                            >
                              <div className="modal-header">

                                <button
                                  aria-label="Close"
                                  className="close"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={() => this.toggleModal("defaultModal")}
                                >
                                  <span aria-hidden={true}>×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <center>
                                  <h2>
                                    ยืนยันที่จะลบหรือไม่
                </h2>
                                </center>
                              </div>
                              <div className="modal-footer">
                                <Button color="danger" onClick={this.delete.bind("Undata", data.c_id)} type="button" style={{ marginLeft: '300px' }} >
                                  ลบ
                </Button>
                                <Button
                                  className="ml-auto"
                                  color="link"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={() => this.toggleModal("defaultModal")}
                                >
                                  ไม่ลบ
                </Button>
                              </div>
                            </Modal>

                          </tr>
                        )}

                      </tbody>
                    </Table> : ""
                }

                {
                  this.state.status == 'edit' ?
                    <Editcategory backToCate={this.backToCate} id={this.state.c_id} />
                    : ""
                }
              </Card>
            </Col>

          </Row>


        </Container>
      </>
    );
  }
}

export default Category;
