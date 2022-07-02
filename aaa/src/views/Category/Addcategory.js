import React, { Component } from "react";
import Uploadimage from '../Uploadimage';
import {
    FormGroup,
    Form,
    Input,
    Row,
    Button 
  } from "reactstrap";
import api from '../../Url_api';
import axios from 'axios';

export default class Addcategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagename : ""
        }
      
      
    }

    OnSubmitLogin = (e)=>{
        e.preventDefault()
        const nameCategory = this.getName.value;
        //console.log("test "+this.state.imagename+" "+nameCategory);
        
       axios.post(api('addCategory'), 
        JSON.stringify({
          'categoryname': nameCategory,
          'image': this.state.imagename
        }))
        .then(res => {
           if(res.data == true ){
            this.props.backToCate();
           }
        })
      
        
      }

      handleImage =(imagename)=> {
          console.log(imagename);
        this.setState({
            imagename : imagename
        })
      }

  

    render() {
       
       return(
            <div className="App">
                 <Form onSubmit={this.OnSubmitLogin}>
                    <Row>
                <table style={{marginLeft:150}}>
                   <tr>
                        <td>ประเภทอาหาร</td>
                      
                       
                    </tr> <tr>
                    
                        <th width={300}>
                        <FormGroup>
                            <input
                            placeholder="ชื่อประเภทอาหาร"
                            type="text"
                            ref={(input)=>this.getName = input}
                            />
                        </FormGroup>
                        </th>
                        
                      
                    </tr>
                    <td>รูป</td>
                    <tr>
                        <td><Uploadimage imagename={this.handleImage}/></td>
                      
                       
                    </tr>
                </table>
               
            </Row>
            <Row style={{marginLeft:150,marginBottom:150}}>
            <Button color="success" type="submit">
                เพิ่ม
                </Button>
                <Button onClick={this.props.backToCate} color="danger" type="button">
                ยกเลิก
                </Button>
                </Row>
            </Form>
            </div>
       )
        
    }
}