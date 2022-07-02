import React , { Component } from 'react';
import axios from 'axios';
import api from '../Url_api';

class Signup extends Component{

    constructor(){
        super();
        this.state = {
            id:'',
            position:'',
            status:''
        }
       
        
    }

    onRadioChange = (e) => {
      this.setState({
        position: e.target.value
      });
    }
    
    
    OnSubmit = (e)=>{
      e.preventDefault()
      const Name = this.getName.value;
      const Position = this.state.position;
      const Username = this.getUsername.value;
      const Password = this.getPassword.value;

      axios.post(api('register'), 
      JSON.stringify({
        'username': Username,
        'password': Password,
        'name': Name,
        'position': Position
      }))
      .then(res => {
        
        if(res.data == 1){
          this.props.history.push('/login');
        }
        
    
      })
    
      
    }


    render(){
        return(
           
          <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img src="https://myseshabu.com/image/img-01.png" alt="IMG"/>
              </div>
      
              <form className="login100-form validate-form" onSubmit={this.OnSubmit}>
                <span className="login100-form-title">
                  สมัครสมาชิก
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Username is required">
                  <input className="input100" type="text" name="user" placeholder="ชื่อ - สกุล" ref={(input)=>this.getName = input}/>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                </div>
      
                <div className="wrap-input100 validate-input" data-validate = "Username is required">
                  <input className="input100" type="text" name="user" placeholder="ชื่อผู้ใช้" ref={(input)=>this.getUsername = input}/>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                </div>
      
                <div className="wrap-input100 validate-input" data-validate = "Password is required">
                  <input className="input100" type="password" name="pass" placeholder="รหัสผ่าน" ref={(input)=>this.getPassword = input}/>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="form-check" style={{marginLeft:'35px'}}>
                <input className="form-check-input" type="radio" id="exampleRadios1" value="employee" onChange={this.onRadioChange}/>
                <label className="form-check-label" for="exampleRadios1">
                  พนักงาน
                </label>
              </div>
              <div className="form-check" style={{marginLeft:'35px'}}>
                <input className="form-check-input" type="radio" id="exampleRadios2" value="manager" onChange={this.onRadioChange}/>
                <label className="form-check-label" for="exampleRadios2">
                  ผู้จัดการ
                </label>
              </div>
                
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    ยืนยัน
                  </button>
                </div>
      {
        this.state.status_login != false ?  ""
      :<div className="text-center p-t-12">
      <p className="txt3"> Username and Password incorrect!!</p>
     </div>
      }
                
                
              </form>
            </div>
          </div>
        </div>
     
   
        )
    }
}export default Signup;