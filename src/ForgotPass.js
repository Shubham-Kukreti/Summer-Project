import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class ForgotPass extends Component {
  constructor(){
      super()
      this.pass=()=>{
        var uName= document.getElementById("Uname").value;
        var pass=document.getElementById("passW").value;
        var cpassW=document.getElementById("CpassW").value;

        if(pass=="" || cpassW=="" || uName==""){
          alert("Fields cannot be empty")
  
      }
      else if(pass!=cpassW){
          alert("Confirm Password Should be Same as Password")
      }
     
      else{
        axios.post('http://localhost:8080/http://localhost:6000/forgot',{'uname':uName,'passwordS':pass})
        .then((res)=>{
          if(res.data.status=='notRegistered'){
            alert('You are not Registered! \n Please SignUp First')
          }
          else if(res.data.status=='successful'){
            alert('Password Changed Successfully \n Now You can Login With Your New Password')
          }
        })
         
        .catch()
        
      }
    }


  }
  
  render(){
  return (
      <div id="fPass">
        <img className="CrossLS" src={require('./Images/cross2.png')}/>
        <center>
       <h3>Change Your Password</h3>
       <br />
        <table id="fPassTable">
            <tr>
                <td><label>UserName:</label></td>
                <td><input type="text" id="Uname"></input></td>
            </tr>
            <tr>
                <td><label>New Password:</label></td>
                <td><input type="password" id="passW"></input></td>
            </tr>
            <tr>
                <td><label>Confirm Password:</label></td>
                <td><input type="password" id="CpassW"></input></td>
            </tr>
        </table>
        <button type="button" onClick={this.pass}>Enter</button>
        </center>

      </div>
  );
  }

}

export default ForgotPass;