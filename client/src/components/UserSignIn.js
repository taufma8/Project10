import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Consumer } from './Context'
import {withRouter} from 'react-router';

//This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. 
class UserSignIn extends Component {
    constructor(){
        super()
        this.state = {
        user: "",
        password: "",
        emailAddress:""
        }
    }
    //an event handler that changes the state of the component when the value changes
    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    //an event handler that calls the signIn method from the global state to check authentication
    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.state.emailAddress, this.state.password)
    }
     
    render() {
        return (
            //uses the react context API provider component as a consumer to check for authenticaion
            <Consumer>
              {context => {
                if (context.signedIn){
                   this.props.history.goBack();
                }
            return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                {this.state.emailPassError}
                {this.state.retry}
                <form onSubmit={this.handleSubmit}>
                        <div><input id="emailAddress" name="emailAddress" onChange ={this.handleChange} type="text" className="" placeholder="Email Address" ref={(input) => this.user = input} value={this.state.emailAddress} /> </div>
                        <div><input id="password" name="password" onChange={this.handleChange} type="password" className="" placeholder="Password" ref={(input) => this.password = input} value={this.state.password} /> </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button>
                        <Link to="/courses"><button className="button button-secondary">Cancel</button></Link></div>

                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
            );
            }}
        </Consumer>
        );
    }
}
export default withRouter (UserSignIn);