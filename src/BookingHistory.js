import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
class BookingHistory extends Component {
 constructor(){
    super()
    
    this.showH=()=>{
        // axios.post('http://localhost:8080/http://localhost:6000/showHistory',{'UserName':localStorage.getItem('userName')})
        // .then((res)=>{
        //     console.log(res)
        // })
        // .catch()

        document.getElementById('historyContent').innerHTML=`<img src="${require('./Images/loading2.gif')}"/>`
        axios.post('http://localhost:8080/http://localhost:6000/bookingHistory',{uname:localStorage.getItem('userName')})
        .then((res)=>{
            document.getElementById('historyContent').innerHTML=""
            if(res.data.status=="none"){
                alert('You haven\'t booked any tickets Yet')
            }
            else{
                document.getElementById("historyContent").insertAdjacentHTML('beforeend',`
                <tr>
                    <td><label>Movie Name: </label></td>
                    <td><p>${res.data.Movie}</p></td>
                </tr>
                
                <tr>
                    <td><label>Show Time: </label></td>
                    <td><p>${res.data.ShowTime}</p></td>
                </tr>
                <tr>
                    <td><label>Seat No.: </lable></td>
                    <td><p>${res.data.SeatNo}</p></td>
                </tr>
                <tr>
                    <td><label>Amount Paid:</label></td>
                    <td><p>${res.data.Amount}</p></td>
                </tr>
                <tr>
                    <td><label>Booking Time:</label></td>
                    <td><p>${res.data.BookingTime}</p></td>
                </tr>

                `)
        
            }
        })
        .catch()
    
    }

 }

 componentDidMount(){
     this.showH()
 }
    
    render(){
        return (
            <div id="history">
             <center>
             <img className="CrossLS" src={require('./Images/cross2.png')}/>
             <h3>Your Latest Booking</h3>
             <br/>
                
                <table id="historyContent">

                </table>
            </center>
            </div>
            

        )
    }
}
export default BookingHistory;