import React,{Component} from 'react';
import './App.css';

class Welcome extends Component {
  constructor(){
    super();

    this.afterLogin=()=>{
      if(localStorage.getItem('token')!=undefined){
        document.getElementById("welcome").style.display="none";
      }
      else{
        return;
      }
    }


  }
  componentDidMount(){
    this.afterLogin();
  }
  render(){
  return (
    <div id="welcome">
     <div id="welcomeContent">
        <h1>WELCOME TO </h1>
        <h2>MovieOn</h2>
        <h3>Online Movie Tickets Booking Portal</h3>    
        <button type="button" class="btn btn-warning" id="welcomeButton">ENTER</button>
      </div>
   </div>

  );
}
}

export default Welcome;