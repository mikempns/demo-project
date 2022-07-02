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

export default class Editcategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagename : "",
            data:[]
        }
      
      
    }

    componentDidMount(){
        const c_id = this.props.id;
          
       axios.post(api('getCategoryById'), 
       JSON.stringify({
         'c_id': c_id,
        
       }))
       .then(res => {
           this.setState({
               data:res.data[0],
               imagename : res.data[0].c_icons
            })
       
       })

    }

    OnSubmitLogin = (e)=>{
        e.preventDefault()
        const nameCategory = this.getName.value;
        //console.log("test "+this.state.imagename+" "+nameCategory);
        
       axios.post(api('updatecategory'), 
        JSON.stringify({
          'c_id': this.state.data.c_id,
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
                            value={this.state.data.c_name}
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
                ยืนยัน
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