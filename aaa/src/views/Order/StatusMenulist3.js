import React from 'react';
import axios from 'axios';
import api from '../../Url_api';

class StatusMenulist3 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        all : 0,
        have : 0
        }
     
    }

    componentDidMount(){
       const order = this.props.order;
       axios.post(api('getNumberOrder'), 
        JSON.stringify({
            'order_id' : order
        }))
        .then(res => {
      
      this.setState({
          all:res.data.all[0].row_count,
          have:res.data.have[0].num_status
      })
  })
       
    }


    render(){
        return(
            <>
            { this.state.have != this.state.all ? 
             <lable type="text" className="btn btn-danger">
             {this.state.have+"/"+this.state.all}
            </lable>
            :
            <lable type="text" className="btn btn-success">
                                    {this.state.have+"/"+this.state.all}
            </lable>
            }
            </>
        )
    }
}export default StatusMenulist3;