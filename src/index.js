import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import Booking from './Booking';
import BookingHistory from './BookingHistory';

ReactDOM.render(<App />, document.getElementById('root'));
var i=0
var j=0
var l=0
document.addEventListener("click",(e)=>{

    if(e.target.id=="headerSignIn"){
       document.getElementById("transparentBack").style.display="block";
       //document.getElementById("carouselExampleInterval").style.display="none";
       
    //    if(window.outerWidth>450){
    //    }
      
       document.getElementById("Sign").style.display="block";

       setTimeout(()=>{document.getElementById("Sign").style.height="50%"},500)

      setTimeout(()=>{ReactDOM.render(<SignIn />, document.getElementById('Sign'))},1000);
    }

    else if(e.target.id=="transparentBack" || e.target.className=="CrossLS"){

        //document.getElementById("carouselExampleInterval").style.display="block"  
        document.getElementById("transparentBack").style.display="none";
        ReactDOM.unmountComponentAtNode(document.getElementById("Sign"),<SignIn />)
        ReactDOM.unmountComponentAtNode(document.getElementById("Sign"),<BookingHistory />)
        if(window.outerWidth>450){
            document.getElementById("Sign").style.height="0";

            setTimeout(()=>{document.getElementById("Sign").style.display="none"},1000);
        }
        else{
            
            document.getElementById("Sign").style.height="0";
            setTimeout(()=>{document.getElementById("Sign").style.display="none"},1000);
            document.getElementById("middlePart").style.gridTemplateColumns="100% 0%"
            document.getElementById("middle").style.display="none";
            document.getElementById("menubar2").style.display="none";
            document.getElementById("middleLeft").style.display="grid";
            document.getElementById("middleLeft").style.gridTemplateRows="10% 90%";
    
            
        }
        document.getElementById("Booking").style.display="none";
    }

    else if(e.target.id=="bSignup"){
        if(window.outerWidth>450){
        document.getElementById("Sign").style.height="62%";
        }
        
        ReactDOM.unmountComponentAtNode(document.getElementById("Sign"),<SignIn />)
        ReactDOM.render(<SignUp />, document.getElementById("Sign"));
    }

    else if(e.target.id=="bSignIn"){
        if(window.outerWidth>450){
        document.getElementById("Sign").style.height="50%";
        }
        ReactDOM.unmountComponentAtNode(document.getElementById("Sign"),<SignUp />)
        ReactDOM.render(<SignIn />, document.getElementById("Sign"));  
    }

    else if(e.target.id=="forgotPass"){
        if(window.outerWidth>450){
        document.getElementById("Sign").style.height="40%";
        }
        ReactDOM.unmountComponentAtNode(document.getElementById("Sign"),<SignIn />)
        ReactDOM.render(<ForgotPass />, document.getElementById("Sign"));
    }

    else if(e.target.id=="headerMenuImg"){
        if(i==0){
            document.getElementById("menuBar").style.display="block";
            setTimeout(()=>{document.getElementById("menuBar").style.width="20%"},100);
        //document.getElementById("carouselExampleInterval").style.display="none";
            i++;
        }
        else if(i==1){
            document.getElementById("menuBar").style.width="0"

            setTimeout(() => {document.getElementById("menuBar").style.display="none"}, 1000);
        
        //document.getElementById("carouselExampleInterval").style.display="block";
        i--;
        }
    }

    else if(e.target.id=="menuBack"){
        document.getElementById("menuBar").style.width="0"
        i--;  
    }

    else if(e.target.id=="home" || e.target.id=="home2"){
        window.location.reload();
    }

    else if(e.target.id=="bHistory" || e.target.id=="mHistory"){
        document.getElementById("Sign").style.display="block";
        if(window.outerWidth>450)
        {
        setTimeout(()=>{document.getElementById("Sign").style.height="50%"},200);}
        else{
        document.getElementById("Sign").style.height="80vh";}

        setTimeout(()=>{ReactDOM.render(<BookingHistory />, document.getElementById('Sign'));},1000);

    }



    else if(e.target.id=="CrossBH"){
        document.getElementById("Sign").innerHTML="";
        document.getElementById("transparentBack").style.display="none";
        document.getElementById("Sign").style.display="none";
    }

    else if(e.target.id=="menuLogOut" || e.target.id=="mLogOut"){
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        window.location.reload()
    }
    
    else if(e.target.id=="deleteAcc"){
        
        var v = window.confirm("Are You Sure? \n *Deleted Account Cannot Be Retrieved!*");

        if(v==true){
        axios.post('http://localhost:8080/http://localhost:6000/delete',{'DUser':localStorage.getItem('userName')})
        .then((res)=>{
            if(res.data.status=="deleted"){
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                alert("Successfully Deleted")
                window.location.reload()
            }
        })
        .catch((err)=>{
            alert("Something went Wrong!")
        })
        }
        else{
            return;
        }
    }
    
    else if(e.target.id=="headerHeading")
    {
        window.location.reload()
    }

   
    else if(e.target.id=="welcomeButton"){
        document.getElementById("welcomeContent").style.visibility="hidden"
        document.getElementById("welcome").style.height="0"
       // document.getElementById("welcome").style.width="0"
        setTimeout(() => {document.getElementById("welcome").style.display="none";
            
        },2000);
        
    }
    else if(e.target.id=="bookButton"){
        if(localStorage.getItem("token")==undefined){
            alert("You have to be Signed In first to Book Ticket(s)");
        }

        else{
            
            document.getElementById("transparentBack").style.display="block";
            document.getElementById("Booking").style.display="block";
            if(window.outerWidth>450)            
            setTimeout(()=>{document.getElementById("Booking").style.height="65vh"},200);
            else
            setTimeout(()=>{document.getElementById("Booking").style.height="80vh"},200);
            setTimeout(()=>{ReactDOM.render(<Booking />, document.getElementById("Booking"))},1000);
                   }
    }

    else if(e.target.id=="bookingCross"){
        document.getElementById("transparentBack").style.display="none";
        ReactDOM.unmountComponentAtNode(document.getElementById("Booking"),<Booking />)
        document.getElementById("Booking").style.height="0";
        setTimeout(()=>{document.getElementById("Booking").style.display="none"},1000);    
        

        }

    else if(e.target.id=="check"){
     var x=document.getElementById("movieTime").value;
     var t=document.getElementById("nTicket").value;
     if(t.length>3 || t==""){
         alert("Enter a valid Seat number")
     }

     else{
        // var today= new Date();
        // var tDate=today.toString()
        // var p=Math.random();
        // var pc=parseInt(p*600);
        // axios.post('http://localhost:8080/http://localhost:6000/booked',{'UserName':localStorage.getItem('userName'),'mName':localStorage.getItem('movieName'),'sTime':x,'Seat':t,'amount':pc,'btime':tDate})
        // .then((result)=>{
        //     if(result.data.status=="already"){
        //         alert("Sorry! Selected Seat is already Booked.\n Please choose another one.")
        //     }
        //     else{
            
        //     var v=prompt("Your ticket cost is "+ pc + "\nPlease Enter Your Credit Card Number.")
        //     if(v.length<19 || v=="" || v.length>19)
        //     {
        //         alert("Enter a valid Credit Card")
        //     }
            
        //     if(result.data.status=="booked"){
        //         alert("Your Ticket is successfully booked.\n Enjoy the Show!")
        //         document.getElementById('Booking').style.display="none";
        //         document.getElementById('transparentBack').style.display="none";
           
        
        
        // }

        // }
        // })
        // .catch()

        axios.post('http://localhost:8080/http://localhost:6000/checkSeat',{'seat':t,'sTime':x,'mName':localStorage.getItem('movieName')})
        .then((res)=>{
            if(res.data.status=="notAvailable")
                alert("Selected Seat is already Booked!\n Please select another seat.")
            else if(res.data.status=="sAvailable"){
                alert("Selected Seat is Available!")
                document.getElementById("check").style.display="none"
                document.getElementById("cBook").style.display="block"
            }
        })
        .catch()
    }
    }
    
    else if(e.target.id=="cBook")
    {
        var x=document.getElementById("movieTime").value;
        var t=document.getElementById("nTicket").value; 
        var today= new Date();
        var tDate=today.toString()
        var p=Math.random()*100;
        var pc=parseInt(p*6);
        //var v=0;
        axios.post('http://localhost:8080/http://localhost:6000/booked',{'UserName':localStorage.getItem('userName'),'mName':localStorage.getItem('movieName'),'sTime':x,'Seat':t,'amount':pc,'btime':tDate})
        .then((result)=>{
            if(result.data.status=="already"){
                alert("Sorry! Selected Seat is already Booked.\n Please choose another one.")
            }
            else{
            
          var v=prompt("Your ticket cost is "+ pc + "\nPlease Enter Your Credit Card Number.")
            if(v==null)
            {
                alert("Enter a valid Credit Card")
            }
            else if(v.length<19 || v.length>19){
                alert("Enter a valid Credit Card")
            }
            else{
            if(result.data.status=="booked"){
                alert("Your Ticket is successfully booked.\n Enjoy the Show!")
                document.getElementById('Booking').style.display="none";
                document.getElementById('transparentBack').style.display="none";
            }
        
        
        }

        }
        })
        .catch()



    }

    else if(e.target.id=="headerMenuImg2"){
        if(j==0){
        
        document.getElementById("menubar2").style.display="grid"
        document.getElementById("menubar2").style.gridTemplateRows="15% 15% 15% 15% 15% 15% 10%";
        setTimeout(() => {document.getElementById("menubar2").style.height="50vh"}, 200);
            if(localStorage.getItem('token')!=undefined){
                document.getElementById("menuSignIn").style.display="none";
                
                if(l==0){
                    document.getElementById("home2").insertAdjacentHTML('beforebegin',`<h4 id="mAfterLogin" >Welcome,${localStorage.getItem('userName')}</h4>`);
                    document.getElementById("menuBackList").insertAdjacentHTML("afterend",`
                    <button type="button" id="mHistory">Booking History</button>
                    <button id="mLogOut" type="button">LogOut</button>
                    
                    `)
                    l++;
                }
            }    
            j++;
        }
        
        else if(j==1){
        document.getElementById("menubar2").style.height="0"
        setTimeout(()=>{document.getElementById("menubar2").style.display="none"},400);
        j--;
        }
    }

    else if(e.target.id=="menuSignIn"){
        document.getElementById("Sign").style.display="block";

        setTimeout(()=>{document.getElementById("Sign").style.height="80vh"},500)
        setTimeout(() => {
        ReactDOM.render(<SignIn />,document.getElementById("Sign"))},1000)
        document.getElementById("menubar2").style.display="none"
        j=0;
    }
    
    else if(e.target.id=="menuBackList" || e.target.id=="goBackList" || e.target.id=="list"){
        document.getElementById("middlePart").style.gridTemplateColumns="100% 0%"
        document.getElementById("middle").style.display="none";
        document.getElementById("menubar2").style.display="none";
        document.getElementById("middleLeft").style.display="grid";
        document.getElementById("middleLeft").style.gridTemplateRows="10% 90%";


    }

    else if(e.target.id=="MovieList" && window.outerWidth<450){
        document.getElementById("middleLeft").style.display="none";
        document.getElementById("middle").style.gridTemplateRows="5% 42% auto";
        document.getElementById("goBackList").style.display="block";
        document.getElementById("middle").style.display="grid";


    }
    
})




// If you want your app to work offline and load faster, you can change

// unregister() to register() below. Note this comes with some pitfalls.

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
