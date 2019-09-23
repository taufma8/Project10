import React, { Component } from 'react';
import {BrowserRouter, 
        Route, 
        Switch,
        Redirect} from 'react-router-dom';
import './App.css';
import "./global.css";
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut'
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import {Provider} from './components/Context';
import axios from "axios";
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
    //establishes the state of the component when no one is signed in
    constructor(){
    super();
    this.state= {
        user:'',
        password:'',
        emailAddress:'',
        courses: [],
        currentUser:false,
        validation: false,
        signedIn:false,
        currUser: false,
        isAuthenticated:false
    }
    }
    
    //creates a method called signIn that gets the user's credentials and stores it in a local database that is used to check for authorization
    signIn = (emailAddress, password) => {
     axios.get('http://localhost:5000/api/users', {
        auth: {
            username: emailAddress, 
            password: password
        }
    }).then(response => {
        //enters users info into a local database to be used for authentication
        if(response.status === 200 || response.status ===304) {           
            //sets the state for the user when signed in
            this.setState({
                user: response.data,
                signedIn:true,
                isAuthenticated:true,
                currUser:true,
                validation:true,
                validUser:true
            });
            // from: https://www.robinwieruch.de/local-storage-react/
            localStorage.setItem("user", JSON.stringify(response.data))
            localStorage.setItem("auth", JSON.stringify(response.config.headers.Authorization))

        } 
        //when a user is not in the user database, state is changed to false and they do not log in
        }).catch(err => {
                if(err.response.status === 401) {
                    if(err.response.data.message === "The email or password you entered does not match what we have")
                    this.setState({emailPassError:"The email or password you entered does not match what we have"});
                }
                else if(err.response.data.message === "You are not logged in. Please try again."){
                    this.setState({retry:"You are not logged in. Please try again."});
                }
        })
    }
      //a method used to remove the authenticated user and password from the global state
      signOut = () => {
        this.setState({
          user: '',
          signedIn: false,
          isAuthenticated:false
        });
        localStorage.clear();
      }
      componentDidMount() {
        if(localStorage.user){
          let user = JSON.parse(window.localStorage.getItem('user'))
          this.signIn(user.emailAddress, user.password)
        }
    }
    render() {
        return(
            //the authenticated user and the user sign in and sign out methods are defined using a Context API <Provider> component
             <Provider value={{
                    user:this.state.user,
                    isAuthenticated:this.state.isAuthenticated,
                    signedIn:this.state.signedIn,
                  actions: {
                    signIn:this.signIn,
                    updateCourse:this.UpdateCourse
                  }
              }}
              >
              <BrowserRouter>
                    <div>
                    <Route path="/" render={() => <Header signOut={this.signOut}/>}/>
                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to='/courses'/>} />
                        <Route exact path="/courses" render={ () => <Courses />}/>
                        <Route exact path="/signin" render={ () => <UserSignIn signIn={this.signIn} />}/>    
                        <Route exact path='/signup' render={ () => <UserSignUp signIn={this.signIn} />}/>
                        <PrivateRoute exact path='/courses/create' component= {CreateCourse} validationError={this.state.validationError} validationMessage={this.state.validationMessage}/>
                        <Route exact path='/courses/:id' render={ ({match}) => <CourseDetails id={match.params.id} />}/>
                        <PrivateRoute exact path='/courses/:id/update' component = {UpdateCourse} updateCourse= {this.updateCourse}/>                       
                        <Route exact path='/signout' render={() => <UserSignOut signOut={this.signOut} /> } />
                    </Switch>
                    </div>
              </BrowserRouter>
            </Provider>
        );
    }
}

export default App;