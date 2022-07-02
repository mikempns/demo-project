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


export default class Editfood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagename : "",
            data:[]
        }
      
      
    }

    componentDidMount(){
        const f_id = this.props.id;
          
       axios.post(api('getFoodById'), 
       JSON.stringify({
         'f_id': f_id,
        
       }))
       .then(res => {
           this.setState({
               data:res.data[0],
               imagename : res.data[0].f_img
            })
           
       
       })

    }


    OnSubmitLogin = (e)=>{
        e.preventDefault()
        const nameFood = this.getName.value;

        const nameCategory = this.getCate.value;
        //console.log("test "+this.state.imagename+" "+nameCategory);
        
       axios.post(api('updatefood'), 
        JSON.stringify({
          'foodname':nameFood,
          'category': nameCategory,
          'image': this.state.imagename,
          'f_id':this.state.data.f_id
        }))
        .then(res => {
           if(res.data == true ){
            this.props.backTofood();
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
                <td>ประเภทอาหาร</td>
                    <tr>
                        <th width={300}>
                        <FormGroup>
                            <input
                            placeholder="ชื่อประเภทอาหาร"
                            type="text"
                            value={this.state.data.c_name}
                            ref={(input)=>this.getCate = input}
                            />
                        </FormGroup>
                        </th>
                        
                      
                    </tr>
                    <td>ชื่ออาหาร</td>
                    <tr>
                        <th width={300}>
                        <FormGroup>
                            <input
                            placeholder="ชื่ออาหาร"
                            type="text"
                            value={this.state.data.f_name}
                            ref={(input)=>this.getName = input}
                            />
                        </FormGroup>
                        </th>
                        
                      
                    </tr>
                    <td>ประเภทอาหาร</td>
                    <tr>
                        <td><Uploadimage imagename={this.handleImage}/></td>
                      
                       
                    </tr>
                </table>
               
            </Row>
            <Row style={{marginLeft:150,marginBottom:150}}>
            <Button color="success" type="submit">
                เพิ่ม
                </Button>
                <Button onClick={this.props.backTofood} color="danger" type="button">
                ยกเลิก
                </Button>
                </Row>
            </Form>
            </div>
       )
        
    }
}