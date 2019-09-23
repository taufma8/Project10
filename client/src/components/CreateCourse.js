import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

//This component provides the "Create Course" screen by rendering a form that allows a user to create a new course.
class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
        user:"",
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        validationError:false,
        titleError: "",
        descError: "",
        validMessage:"",
        err:"",
        isLoaded: false,
        signedIn: false,
        id:""
    }
  }
   //method for a POST request to update all of the changes that are made
   createCourse = (id, title, description, estimatedTime,materialsNeeded) => {
    axios.post(`http://localhost:5000/api/courses/`,{
      title:title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
         
     }, {  
     headers:{
      'Authorization': JSON.parse(window.localStorage.getItem('auth'))
        }  
    }).then(res =>{
        this.props.history.push(`/courses`);
    //specific errors based on the API results that renders into the html
    }).catch(err =>{
      if (err.response.status === 400) {
        this.setState({validationError: true, validMessage: "Validation Error"});
        if (err.response.data.message === "Title is required") {
          this.setState({titleError: "Title is required"})
        }
        if (err.response.data.message === "Description is required") {
          this.setState({descError: "Description is required"})
        }
      } else if (err.response.status === 500) {
        console.log(err);
      }
    });
    };
    handleChange = e => {
      this.setState({[e.target.id]: e.target.value});
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.createCourse(this.state.id, this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded)
    }
  render() {
    return (
        <div className="bounds course--detail">
         <h1>Create Course</h1>
         <div>
          <div>
            <h2 className="validation--errors--label">{this.state.validMessage}</h2>
            <div className="validation-errors">
              <ul>
                <li>{this.state.titleError}</li>
                <li>{this.state.descError}</li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleChange}></input></div>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div> <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" onChange={this.handleChange}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button>
            <Link to="/courses"><button className="button button-secondary">Cancel</button></Link></div>
          </form>
        </div>
      </div>
      );
    }
};

export default withRouter(CreateCourse);