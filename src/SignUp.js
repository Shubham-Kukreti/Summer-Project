import React,{Component} from 'react';
import axios from 'axios';
class SignUp extends Component{
constructor(){
    super();
    this.sign=()=>{ 
    var fName= document.getElementById("fname").value;
    var lName=document.getElementById("lname").value;
    var mailE=document.getElementById("e-mail").value;
    var uName= document.getElementById("Uname").value;
    var pass=document.getElementById("passW").value;
    var cpassW=document.getElementById("CpassW").value;
    
    if(fName=="" || lName=="" || pass=="" || cpassW=="" || uName==""){
        alert("Fields cannot be empty")

    }
    else if(pass!=cpassW){
        alert("Confirm Password Should be Same as Password")
    }
    else{
        axios.post('http://localhost:8080/http://localhost:6000/signup',{'firstN':fName,'lastN':lName,'email':mailE,'uname':uName,'passwordS':pass,'CpasswordS':cpassW})
        .then((res)=>{
            if(res.data.value=="already"){
                alert("You are already registered")
            }
            
            else if(res.data.value=="registered"){
               alert("Succesfully Signed Up. \n Now you can SignIn Using Your Credentials.")
            }
        })
        .catch()  

    }




}

    
}
render(){
    return(
        <div id="pSignup">
            <img className="CrossLS" src={require('./Images/cross2.png')}/>
            <center>
               <h3 class="loginSup">Sign Up</h3>
               <form id="signup">
                <table id="login_table">
                    <tr>
                    <td><label>First Name: </label></td>
                    <td><input type="text"id="fname"></input></td>
                    </tr>
                    <tr>
                    <td><label>Last Name: </label></td>
                    <td><input id="lname" type="text"></input></td>
                    </tr>    
                    <tr>
                    <td><label>UserName: </label></td>
                    <td><input type="text"id="Uname"></input></td>
                    </tr>
                    <tr>
                    <td><label>Email: </label></td>
                    <td><input id="e-mail" type="email"></input></td>
                    </tr>    
                    <tr>
                    <td><label>Password: </label></td>
                    <td><input id="passW" type="password"></input></td>
                    </tr>    
                    <tr>
                    <td><label>Confirm Password: </label></td>
                    <td><input id="CpassW" type="password"></input></td>
                    </tr>
                    <tr>
                    <td><p></p></td> 
                    </tr>
                    <tr>
                    <td><button type="button" class="btn btn-primary" id="BSignUp" onClick={this.sign}>SignUp</button></td>
                    <td><button type="reset" class="btn btn-danger">Reset</button></td>
                    </tr>            
                    <br/>
                    <tr>
                    <td><h6 class="aSignUp">Already Signed Up? </h6></td>
                    <td><button type='button' class="btn btn-primary" id="bSignIn">SignIn</button></td>
                    </tr>
                </table>    
                </form>
                <br/>
                
            </center>            
        </div>
    )
}

}
export default SignUp;