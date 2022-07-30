import React, { Component } from 'react';
import '../css/index.css';
import AddProjects from './AddProjects.js';
import ListProjects from './ListProjects.js';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
       myProjects: [],
       isAddingProject: false,
       sortVariable:"", sortUpDown:""
      }
      this.showProjects = this.showProjects.bind(this);
      this.deleteProject = this.deleteProject.bind(this);
      this.handleSort = this.handleSort.bind(this);
      this.sort = this.sort.bind(this);
  }

  //Set state to add project state
  showAddProject(){
    this.setState({isAddingProject: true});
  }

  //Set state to show projects state
  showProjects(){
    this.setState({isAddingProject: false});
    //alert("refresh")
  }

  //Remove item from array (projects)
  removeValue(arr, value){
    return arr.filter(item => item !== value);
  }

  //Delete project from projects array
  deleteProject(project){
    let newProjects = this.removeValue(this.state.myProjects, project);
    this.setState({ myProjects: newProjects});
  }

  //Change the corresponding state every time the user changes the sort selection
  handleSort(event){
    //Sets the state and calls back whether to sort the projects or not
    this.setState({[event.target.name]: event.target.value},function(){    
      //Check if sort variable's values have value or not.
      if (this.state.sortVariable === "" || this.state.sortUpDown === ""){
        return;
      }
      this.sort();});  
  }

  /*
  * Sort based on two different state variables, what to sort by and which direction, only when both values are specfied.
  * Projects can be sorted in ascending or descending order by project name and start date
  */
  sort(){
    //Refresh the project list, importantly for add project
    this.showProjects();
    //Sort by start date
    if (this.state.sortVariable === "1"){
        //Sort descending
        if (this.state.sortUpDown === "1"){
            this.state.myProjects.sort(function(a, b){ 
                return a.start_date < b.start_date;
            })
        }
        //Sort ascending
        else{
            this.state.myProjects.sort(function(a, b){ 
                return a.start_date > b.start_date;
            })
        }
    }
    //Sort by project name
    else{
        //Sort descending
        if (this.state.sortUpDown === "1"){
            this.state.myProjects.sort(function(a, b){ 
                return b.projectName.toLowerCase().localeCompare(a.projectName.toLowerCase());
            })
        }
        //Sort ascending
        else{
            this.state.myProjects.sort(function(a, b){ 
                return a.projectName.toLowerCase().localeCompare(b.projectName.toLowerCase());
            })
        }
    }
    //Refresh the project list
    this.showProjects();
  }

  //Using fetch in lifecycle method to get the initial projects from data.json and list them
  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(result => { this.setState({myProjects: result});})
  }

  //What the component should display
  render() {
    const isAddingProject = this.state.isAddingProject;
    let button; let component;
    //If adding project, setup back to projects button and add projects component 
    if (isAddingProject){
      button = <button id="projects-view" onClick={() => this.showProjects()}>Back to Projects</button>
      component = <AddProjects projects={this.state.myProjects} sort={this.sort} showProjects={this.showProjects}/>
    }
    //If not adding project, setup add project button and list projects component 
    else{
      button = <button id="project-add" onClick={() => this.showAddProject()}>Create a New Project</button>
      component = <ListProjects projects={this.state.myProjects} handleSort={this.handleSort} deleteProject={this.deleteProject}/> 
    }
    //Display main heading, button and component
    return (
      <div className="container">
        <div className="heading">
          <h1 id="main-heading">Projects</h1>
          {button}<br/><br/>
        </div>
        {component}
      </div>
    )
  }; 
} 
export default App; 