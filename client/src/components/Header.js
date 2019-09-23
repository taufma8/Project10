import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';

//Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).
class Header extends Component {  
    constructor() {
        super();
        this.state = {
            id: "",
            title:"",
            description:"",
            user:"",
            courses:[],
            isLoaded: false,
            signedIn: false
        }
    }
    //renders html if the authenticated user is signed in and offers a sign up page for those who do not have a log in
    render(){
        return(
        <Consumer>
         {context=> {
             if (context.signedIn){
                return (
                    <div className="header">
                        <div className="bounds">
                            <Link to="/"><h1 className="header--logo"> Courses</h1></Link>
                                <nav>
                                 <span>
                                    Welcome, {context.user.firstName} {context.user.lastName}</span>
                                    <Link className="signout" to={"/signout"}>Log Out</Link> 
                               </nav>
                        </div>
                    </div>
                )
        } else {
            return(
                <div className="header">
                    <div className="bounds">
                        <Link to="/"><h1 className="header--logo"> Courses</h1></Link>
                        <nav>
                            <Link to='/signIn' className="signin">Sign In</Link>
                            <Link to='/signUp' className="signup">Sign Up</Link>
                        </nav>
                    </div>
                </div>
            )
        }
        }}
        </Consumer>
      )
    }
}



export default Header;