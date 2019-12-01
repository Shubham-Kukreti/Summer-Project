import React,{Component} from 'react';
import axios from 'axios'
class SignIn extends Component{
constructor(){
    super();
this.signin=()=>{
    var uname=document.getElementById("uName").value;
    var upass=document.getElementById("uPass").value;
    axios.post('http://localhost:8080/http://localhost:6000/signIn',{'userName':uname,'userPassword':upass})
    .then((result)=>{
     if(result.data.token=='invalid'){
       alert("You have to SignUp First")
       window.location.reload();
     } 
     
     else{
        localStorage.setItem('token',result.data.token) 
        localStorage.setItem('userName',result.data.Name)
        alert("Successfully SignedIn!")
         window.location.reload();

     }
})
    .catch()

}

}





render(){
    return(
        <div id="pLogin">
           <img className="CrossLS" src={require('./Images/cross2.png')}/>
           <center>
               <h3 class="loginSup">Sign In</h3>
            
                <form>
                   <table id="lTable">
                       <tr>
                           <td><label>UserName: </label></td>
                           <td><input id="uName" type="text"></input></td>
                       </tr>
                       {/* <tr>
                           <td><label>Email: </label></td>
                           <td><input id="uEmail" type="email"></input></td>
                           </tr> */}
                      
                       <tr>
                           <td><label>Password: </label></td>
                           <td><input id="uPass" type="password"></input></td>
                       </tr>
                       </table>
                       <br/>
                       <button type="button" id="BSignIn" onClick={this.signin} class="btn btn-primary">SignIn</button>
                       <br/>
                       <h5 id="forgotPass">Forgot Password?</h5>
                       <br/>
                        <table>
                        <tr>
                        <td><h6 class="aSignUp">Not Registered Yet?</h6></td>
                        <td><button type="button" id="bSignup" class="btn btn-primary">Sign Up</button></td>
                        </tr>
                        
                        </table>
               </form>
           </center>

        </div>
    )
}
}
export default SignIn 