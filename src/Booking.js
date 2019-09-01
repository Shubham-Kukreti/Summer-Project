import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
class Booking extends Component {
 constructor(){
    super()
//     this.book=()=>{
//         var num=document.getElementById("nTicket").value;
//         if(num>4){
//             alert("You cannot book more than 4 tickets at once!")
//         }

//         else if(num==0||num==""){
//             alert("Please Enter the Number of Tickets")
//         }
//         else if(num<0){
//             alert("Number of tickets")
//         }

//         else{
//             document.getElementById("bInputs").innerHTML=""
//             for(var i=0;i<num;i++){
//             document.getElementById("bInputs").insertAdjacentHTML("beforeend",`
//             <tr><td>
//                 <p>For Ticket ${i} :</p>
//             </td></tr>
//             <tr><td>
//                 <p>Select Row: </p>
//                 <select id="row">
//                     <option value="A">A</option>
//                     <option value="B">B</option>
//                     <option value="C">C</option>
//                     <option value="D">D</option>
//                     <option value="E">E</option>
//                     <option value="F">F</option>
//                     <option value="G">G</option>
//                     <option value="H">H</option>
//                     <option value="I">I</option>
//                     <option value="J">J</option>
//                 </select>
//             </td>
//             <td>
//                 <p>Select Seat: </p> 
//                 <select id="number">
//                 <option value=1>1</option>
//                 <option value=2>2</option>
//                 <option value=3>3</option>
//                 <option value=4>4</option>
//                 <option value=5>5</option>
//                 <option value=5>5</option>
//                 <option value=6>6</option>
//                 <option value=7>7</option>
//                 <option value=8>8</option>
//                 <option value=9>9</option>
//                 <option value=10>10</option>
//                 <option value=11>11</option>
//                 <option value=12>12</option>
//                 <option value=13>13</option>
//                 <option value=14>14</option>
//                 <option value=15>15</option>
//                 <option value=16>16</option>
//                 </select>
                
                
            
//             </td>
//             </tr>
//             `)
         
//             }

//             document.getElementById("bookingContent").insertAdjacentHTML("beforeend",`
            
//             <p><button type="button" id="cBook"><i class="fas fa-ticket-alt"></i>  Book</button></p>

//             `)
//         }
//     }
 }
    
 
    render(){
     return (
      <div id="booking">
         <img id="bookingCross" src={require('./Images/cross.png')}/>
         <center>
         <h2>Book Your Tickets</h2> 
         
         <div id="bookingContent">
         <table id="bInputs">
             <tr>
                 <td><label>Select Your Time Slot: </label></td>
                 <td><select id="movieTime">
                        <option value="9:00AM">9:00AM</option>
                        <option value="12:00PM">12:00PM</option>
                        <option value="2:00PM">2:00PM</option>
                        <option value="4:00PM">4:00PM</option>
                        <option value="8:00PM">8:00PM</option>
                        <option value="11:00PM">11:00PM</option>
                     
                     </select></td>
             </tr>
             <tr>
                <td><label>Enter Your Seat(only one): </label></td>
                <td><input type="text" placeholder="e.g.A1" id="nTicket"></input></td>
            </tr>
            {/* <tr>
                <td><button type="button" onClick={this.book}>Enter</button></td>
            </tr> */}
        </table>
        <img id="seats" src={require('./Images/mHall.png')}/>
        <p><button type="button" id="cBook"><i class="fas fa-ticket-alt"></i>  Book</button></p>
        </div>
        </center>

      </div>
  )
  }
}

export default Booking;