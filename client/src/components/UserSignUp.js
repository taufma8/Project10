import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

//This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account
class UserSignUp extends Component {
    constructor(){
    super();
        this.state = {
            firstName:"",
            lastName:"",
            emailAddress:"",
            user: "",
            password: "",
            confirmPassword:"",
            fieldError:"",
            emailDupError:"",
            error:"",
            signedUp: false,
            validation: ""

        }
    }   
    //used for the post route
    signUp = (firstName, lastName, emailAddress, password) => {
        axios.post('http://localhost:5000/api/users', {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password
        }).then(response => {
            if (response.status === 201) {
                this.setState({validation: false})
                this.props.signIn(emailAddress, password)
            }
          }).then(response => {
            this.props.history.push('/courses')
          })
          //Provides errors from the API and are used to render to the HTML
          .catch (error => {
            if (error.response.status === 400) {
                this.setState({validationError: true, validMessage: "Validation Error"});
            }
            if (error.response.data.message === "First name is required" || "Last name is required" || "Email address is required" || "Password is required") {
                this.setState({
                    fieldError: "You must complete all entry items to sign up" 
                    })
            }
            if (error.response.data.message === 'Email address is already in the system.') {
                this.setState({
                    emailDupError: 'Email address is already in the system'})
            }
            if (error.response.data.message === 'The email you entered is not a valid email address') {
                this.setState({
                    invalidEmailError: 'The email you entered is not a valid email address'})
            }   
    })
    }

    //event handlers to change the state when the value of each changes
    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }
    //only allows for the page to submit if the passwords match
    confirmPass = e => {
        this.setState({confirmPassword: e.target.value});
        if (e.target.value === this.state.password) {
            this.setState({validation: false});
        } else {
            this.setState({validation: true});
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.password  === this.state.confirmPassword) {
            this.signUp(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password)
        }
    }

    render() {
        let wrongPassword ='';
        if(this.state.password !== this.state.confirmPassword){
            wrongPassword = <li> Passwords do not match </li>
        }
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                    <h2 className="validation--errors--label">{this.state.validMessage}</h2>
                    <div className="validation-errors">
                     <ul>
                     <li>{this.state.fieldError}</li>
                     <li>{this.state.emailDupError}</li>
                     <li>{this.state.invalidEmailError}</li>
                     {wrongPassword}
                     </ul>
                     </div>
                     <form onSubmit={this.handleSubmit}>
                        <div><input  id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange}/></div>
                        <div><input  id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange}/></div>
                        <div><input  id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange}/></div>
                        <div><input  id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange}/></div>
                        <div><input  id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.confirmPass}/></div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign Up</button>
                            <Link to={"/"}><button className="button button-secondary">Cancel</button></Link>
                        </div>
                        </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
        )
    }
}

export default withRouter(UserSignUp);