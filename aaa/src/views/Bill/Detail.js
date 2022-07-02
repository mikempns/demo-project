import React from 'react';
import axios from 'axios'; 
import api from '../../Url_api';

class Detail extends React.Component{
    
  constructor(props){
    super(props);
    this.state ={
      detail:[],
      data:[],
      table:null,
      amount: null,
      price:null,
      slip_no:null,
      qa:'no'
    }
  }
  componentDidMount(){
    const bill_id = this.props.bill;
    
    axios.post(api('getBillByID'), 
    JSON.stringify({
      'bill_id':bill_id
    }))
    .then(res => {
     
        const detail = res.data;
        const data = res.data.data;
        
        this.setState({detail})
        this.setState({data})
        this.setState({
            table:this.state.data[0].b_table,
            amount:this.state.data[0].b_amount_people,
            slip_no:this.state.data[0].b_id,
            price:this.state.data[0].b_price,
            qa:this.state.detail.data[0].b_qa
        })
      
      
    })
  }

    render(){
    
        return(
            <div className="row">
            <div className="container-bill" style={{marginLeft: 300 , paddingBottom: 80 , paddingTop : 80}}>
                <div className="container-bill-in">
                
                    <center>
            <h2> SE SHABU </h2>
            <br/> <br/>
            <center>
              <img
                alt="shabulogo"
                src="https://myseshabu.com/image/shabulogo.png"
                width="200px"
                height="200px"
              />
           </center>
           <br/> <br/>
           <div>
        <h6 align="left"> &nbsp;Table : {this.state.table}</h6>
        <h6 align="left"> &nbsp;Slip No  : {this.state.slip_no}</h6>
            <h6 align="left"> &nbsp;Cashier : SE shabu</h6>
            <div className="bantad">
        <h6 align="left"> &nbsp;Time : {this.state.detail.time}</h6> 
        <h6 align="left" id="Date">&nbsp;Date : {this.state.detail.date}</h6>
            
            </div>
            <hr />

             <table className="table table-borderless">
            
            <tbody>
              <tr>
                <th scope="row">{this.state.amount+ " "}คน</th>
                <td>Bufflet {this.state.price} Bath</td>
                <td>{this.state.amount+" "}*{" "+this.state.price}</td>
              </tr>

              { this.state.qa === "yes" ?
                <tr>
                    <td><h4>ลดราคา 5 %</h4></td>
                    <td></td>
                    <td><h4>{((this.state.amount * this.state.price)*5/100).toFixed(2)}</h4></td>
                </tr>
                :""
                }
             
              <tr>
              <th scope="row">ยอดรวม (บาท)</th>
                <td></td>
                { this.state.qa === "yes" ?
                <td>{((this.state.amount*this.state.price)-(this.state.amount * this.state.price)*5/100).toFixed(2)}</td>
                : <td>{this.state.amount*this.state.price}</td>}
              </tr>
            </tbody>
          </table>
          <hr />

         
           
            <p>-------------------------Thank You For Your Support-------------------------</p>
            
            </div>
        
            </center>
          </div>
          </div>
          </div>
        )
    }
}export default Detail;