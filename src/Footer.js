import React,{Component} from 'react';
import './App.css';

class Footer extends Component {
  render(){
  return (
      <div id="footer">
         <h3 id="F_title">MovieOn</h3>
         <div id="footerMid">
           
            
         </div>
        <center>
        
         <div id="imageDiv">
           <p id="conText">Contact Us:</p>
           
           <img class="image" src={require('./Images/fb.png')}/>
           <img class="image" src={require('./Images/insta.png')} />
           <img class="image" src={require('./Images/tweet.jpg')}/>
           <a href="https://www.linkedin.com/in/shubham-kukreti-900608149"><img class="image" src={require('./Images/linked2.png')} /></a>
            

         </div>
         </center>
     </div>
    );
  }
}

export default Footer;
