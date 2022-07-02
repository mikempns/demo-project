import React from 'react';
import axios from 'axios';
import Url_api from '../Url_api';
import { Link } from "react-router-dom";

class Signin extends React.Component{

  constructor(){
    super();
    this.state = {
        id:'',
        position:'',
        status:'',
        status_login:true
    }
}


OnSubmitLogin = (e)=>{
  e.preventDefault()
  const Username = this.getUsername.value;
  const Password = this.getPassword.value;
  
  
 axios.post(Url_api('checklogin'), 
  JSON.stringify({
    'username': Username,
    'password': Password
  }))
  .then(res => {
   
  
    if(res.data.status == true){
      
      
   this.setState({
      status: res.data.status,
      id:res.data.data[0].p_id,
      position: res.data.data[0].p_position
     
    
    });
    }else{

    }
    if(this.state.status === true){
      
      if(this.state.position == 'MANAGER'){
        localStorage.setItem('id', this.state.id);
        localStorage.setItem('name', res.data.data[0].p_name);
        localStorage.setItem('picture', res.data.data[0].p_picture);
        localStorage.setItem('position',this.state.position);
        
        this.props.history.push('/admin');
      }else{
        this.setState({
          status_login : false
        })
      }
     
    }else{
      this.setState({
        status_login : false
      })
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
  
          <form className="login100-form validate-form" onSubmit={this.OnSubmitLogin}>
            <span className="login100-form-title">
              Member Login
            </span>
  
            <div className="wrap-input100 validate-input" data-validate = "Username is required">
              <input className="input100" type="text" name="user" placeholder="Username" ref={(input)=>this.getUsername = input}/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
  
            <div className="wrap-input100 validate-input" data-validate = "Password is required">
              <input className="input100" type="password" name="pass" placeholder="Password" ref={(input)=>this.getPassword = input}/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>
  {
    this.state.status_login != false ?  ""
  :<div className="text-center p-t-12">
  <p className="txt3"> Username and Password incorrect!!</p>
 </div>
  }
          
            <div className="text-center p-t-136">
              <Link className="txt2" to="/register">
                Create your Account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    
  
        );
    };
}
export default Signin;