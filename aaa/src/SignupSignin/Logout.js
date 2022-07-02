import React , { Component } from 'react';

class Logout extends Component {
    componentDidMount(){
        localStorage.removeItem('id');
        this.props.history.push("/");
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }

}export default Logout;