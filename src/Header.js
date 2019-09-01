import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class Header extends Component {
  constructor(){
  super()
   
  this.afterSignIn=()=>{
   
    if(localStorage.getItem('token')!=undefined)
    {
    axios.post('http://localhost:8080/http://localhost:6000/verifyToken',{'token':localStorage.getItem('token')})
      .then((result)=>{
        if(result.data.status=='valid'){
        
          if(window.outerWidth>450){
            document.getElementById("header").style.gridTemplateColumns="20% 40% 10% 20% 10%"
          }
          else{
            document.getElementById("header").style.gridTemplateColumns="50% auto"
          }

          document.getElementById("headerSignIn").style.display="none"
        
          document.getElementById("headerSignIn").insertAdjacentHTML('afterend',`
          <h4 id="afterLogIn">Welcome,${localStorage.getItem('userName')}</h4>
          `)
          document.getElementById("afterLogIn").insertAdjacentHTML('afterend',`
          <img id="headerMenuImg" src=${require('./Images/title.png')} />
          `)
          
    
      }
        else if(result.data.status=='invalid'){
            alert("Your Session has Expired \n Please Sign In again ")
            localStorage.removeItem('token');
            localStorage.removeItem('userName');

          }
      })

      .catch()
    }

    else{
      return;
    }
  }
}

  componentDidMount(){
    this.afterSignIn()
  }
  
  render(){
  return (
    
    <div id="header">
        <h2 id="headerHeading">MovieOn</h2>
        <img id="headerMenuImg2" src={require('./Images/title.png')} />
        <input type="text" placeholder="Search Here" id="headerSearchBar"></input>
        <button type="button" id="headerSearchButton"><i class="fa fa-search" aria-hidden="true"></i> Search</button>
        <button type="button" id="headerSignIn">SignIn</button>

        <div id="menubar2">
      
    
         <input type="text" placeholder="SearchHere" id="menuSearch"></input>
         <button id="home2" type="button">Home</button>
         <button id="menuSignIn" type="button">Sign In</button>
         
         <button id="menuBackList" type="button">Trending Search</button>
         
        
         
      
      </div>
        
      
    </div>
  );
  }
}

export default Header;