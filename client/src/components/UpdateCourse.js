 //renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.
 import React, {Component} from 'react';
 import axios from 'axios';
 import {withRouter} from 'react-router-dom';
 
 class UpdateCourse extends Component {    
  constructor() {
    super(); 
     this.state = {
         courses:[],
         description:"",
         title:"",
         id:"",
         user:"",
         userId:"",
         titleError:"",
         descError:"",
         validMessage:"",
         estimatedTime:"",
         materialsNeeded:"",
         validationError:false,
         isLoaded: false,
         signedIn: false
     }
  }
   
  //  GETS the courses
   componentDidMount() {
     axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
         .then(res => {
             this.setState({
                 isLoaded: true,
                 courses: res.data,
                 description:res.data.description,
                 title:res.data.title,
                 materialsNeeded:res.data.materialsNeeded,
                 estimatedTime:res.data.estimatedTime,
                 id: res.data._id,
                 firstName:res.data.firstName,
                 lastName:res.data.lastName
             })
          }).catch(err =>{
            console.log(err);
          }) 
  }
 
  //method for a PUT request to update all of the changes that are made
  updateCourse = (title, description, estimatedTime, materialsNeeded, id) => {
    axios.put(`http://localhost:5000/api/courses/${id}`,{
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
      //checks for validation errors that is rendered to the HTML based on the API errors
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
      }) 
    }
    handleChange = e => {
      this.setState({[e.target.id]: e.target.value});
    }
   //runs the update course method on submit
    handleSubmit = e => {
      e.preventDefault();
      this.updateCourse(this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded, this.state.id)
    }

 render() {
     return (
       <div className="bounds course--detail">
         <h1>Update Course</h1>
         <div>
         <h2 className="validation--errors--label">{this.state.validMessage}</h2>
            <div className="validation-errors">
              <ul>
              <li>{this.state.titleError}</li>
              <li>{this.state.descError}</li>
              </ul>
            </div>
         <form onSubmit={this.handleSubmit}>
             <div className="grid-66">
               <div className="course--header">
                 <h4 className="course--label">Course</h4>
                 <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleChange} value={this.state.title}></input></div>
                 <p>By: {(this.state.courses.User) ? this.state.courses.User.firstName + " " + this.state.courses.User.lastName : "Instructor Not Listed"}</p>               </div>
               <div className="course--description">
               <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange} value={this.state.description}></textarea></div>
               </div>
             </div>
             <div className="grid-25 grid-right">
               <div className="course--stats">
                 <ul className="course--stats--list">
                   <li className="course--stats--list--item">
                     <h4>Estimated Time</h4>
                     <div><input onChange={this.handleChange} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime || ''}/></div> 
                   </li>
                   <li className="course--stats--list--item">
                     <h4>Materials Needed</h4>
                     <div><textarea id="materialsNeeded" name="materialsNeeded" type="text" className="" placeholder="List materials..." onChange={this.handleChange} value={this.state.materialsNeeded}></textarea></div>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="grid-100 pad-bottom"><button className="button"  type="submit">Update Course</button>
             <button className="button button-secondary" onClick={() => this.props.history.push(`/courses/${this.props.match.params.id}`)}>Cancel</button>
             </div>
           </form>
         </div>
       </div>
     );
   }
 };
 
 export default withRouter(UpdateCourse);