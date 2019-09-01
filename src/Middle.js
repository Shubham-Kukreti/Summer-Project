import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class Middle extends Component {
  constructor(){
    super()
    this.show=()=>{
      
      document.addEventListener('click',(r)=>{
          if(r.target.className=="MvList"){

          document.getElementById("carouselExampleInterval").style.display="none"
          var movieName=r.target.textContent
          localStorage.setItem('movieName',r.target.textContent)
          document.getElementById("images").style.display="block"
          document.getElementById('images').innerHTML=`<img src="${require('./Images/loading.gif')}"/>`
          axios.post('http://localhost:8080/http://localhost:6000/sendData',{'mName':movieName})
            .then((res)=>{
            document.getElementById("images").innerHTML=""
            document.getElementById("images").insertAdjacentHTML('beforeend',`
            <img src=${res.data.imgUrl} />
            <p><button type="button" id="certiButton">${res.data.certi}</button></p>
            <p><i class="fas fa-heart"></i> ${res.data.rating}</p>      
            <p><i class="far fa-calendar-alt"></i> ${res.data.releasing} </p>
            <p><i class="far fa-clock"></i> ${res.data.duration}</p>
            `)


            document.getElementById("info").innerHTML=""
            document.getElementById("info").insertAdjacentHTML("beforeend",`
            <div id="mInfo1">
            <h4>Genre : ${res.data.type}</h4>
            <h4>Language : ${res.data.lang}</h4>
            </div>
            <div id="mInfo2">
            <h3>SYNOPSIS</h3>
            <p>${res.data.synopsis}</p>
            </div>
            <button type="button" id="bookButton"><i class="fas fa-ticket-alt"></i>  Book Tickets</button>
            `)
           
        })
        
        .catch()
        }
      })
      
    }
   
    


  
  }

  // componentDidMount(){
  //   this.showMenu()
  // }
  
  componentDidMount(){
    this.show();
  }

  render(){
  return (
    <div id="middle">
       <img id="goBackList" src={require('./Images/back.png')}/>
       <div id="carouselExampleInterval" class="carousel slide slidingImg" data-ride="carousel">
         <h1>Book Your Seat Right Now </h1>
        <div class="carousel-inner sliding">
          <div class="carousel-item active" data-interval="3000">
            <img src={require('./Movie/seven2.png')} class="d-block w-100" />
           </div>
    
           <div class="carousel-item" data-interval="2000">
            <img src={require('./Movie/four.png')} class="d-block w-100"  />
          </div>
    
          <div class="carousel-item" data-interval="2000">
            <img src={require('./Movie/six.png')} class="d-block w-100"  />
          </div>

          <div class="carousel-item">
            <img src={require('./Movie/one.png')} class="d-block w-100"  />
          </div>
        </div>
  <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>




        <div id="images"></div>
        <div id="info"></div>  
      
      
     
        
     
      <div id="menuBar">
      <img id="menuBack" src={require('./Images/back2.png')} />
      <h2>Hello,{localStorage.getItem('userName')}!</h2>
      <ul id="menuList">
        <li id="home">Home</li>
        <li id="bHistory">Booking History</li>
        <li id="menuLogOut">Sign Out</li>
        <li id="deleteAcc">Delete your Account</li>
      </ul>

      </div>
      
    </div>
  );
  }
}

export default Middle;
