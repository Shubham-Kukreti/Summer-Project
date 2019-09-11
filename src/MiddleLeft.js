import React,{Component} from 'react';
import './App.css';
import axios from 'axios';

class MiddleLeft extends Component {
  constructor(){
    super()

    this.list=()=>{
      document.getElementById('movieList').innerHTML=`<img src="${require('./Images/loading2.gif')}"/>`
      axios.post('http://localhost:8080/http://localhost:6000/sendList')
        .then((result)=>{
          //console.log(result)
          document.getElementById('movieList').innerHTML="";
          for(var i=0;;i++){
          if(result.data.Name[i]==undefined){
            break;}
          else{
            document.getElementById("movieList").insertAdjacentHTML('beforeend',`
          <li class="MvList" id="MovieList">${result.data.Name[i][0]}</li>
          `)
          }}
        })
        .catch()
    }





  }
  
  componentDidMount(){
    this.list();
  }

  
  
  render(){
  return (
    <div id="middleLeft">
      <div className="mList">
        <button type="button" id="tMovies">Trending Searches >> </button>
      </div>

      <div className="movieListDiv">
        <ul id="movieList">
          {/* {this.list()} */}
        </ul>

      </div>
      
    
    </div>
  );
  }
}

export default MiddleLeft;
