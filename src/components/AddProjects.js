import React, { Component } from 'react';
import '../css/index.css';
class AddProjects extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.state = {};
    }

    //Change the corresponding state every time the user changes the input
    handleChange(event){this.setState({[event.target.name]:event.target.value});}

    /*
    * Process the input data once submitted. 
    * If data is valid, the new project data is added to the list
    */
    handleSubmit(event) {
        //Prevent page from being finished
        event.preventDefault();
        //If data is valid
        if (this.validateInput()){
            //Add new project data to the list
            this.props.projects.push(this.state);
            //Update the project list order by sorting from previous values (if any)
            this.props.sort(event);
        }
    }   

    /*
    * Return false as soon as it finds error in input data.
    * Validate data, return true, if all inputs are specified, the project identifier is a number and it's not being used, and the end date is later than the start date
    */
    validateInput(){
        //Check if there are any inputs not specified
        if (!this.state.projectName || !this.state.description || !this.state.projectIdentifier || !this.state.start_date || !this.state.end_date){
            alert("One or more inputs were not specified!");
            return false;
        }

        //Check if the project identifier is not a number
        if (isNaN(this.state.projectIdentifier)){
            alert("Please enter a number as the project identifier!");
            return false;
        }

        //Check if the project identifier is already in use
        for (let i = 0; i< this.props.projects.length; i++){
            if (this.props.projects[i].projectIdentifier === this.state.projectIdentifier){
                alert("There is already a project with the same project identifier!");
                return false;
            }
        }

        //Check if the end date is earlier than the start date
        if (this.state.end_date < this.state.start_date){
            alert("Please specify an end date later than a start date (can be the same day)!");
            return false;
        }
        return true;
    }

    //What the component should display
    render(){
        return(
            //Form for user to input new project information. 
            //Each input control has an onChange handler that sets the corresponding state's value every time the user changes the input.
            <div className="form">
                <h1 id="create-project">Create Project</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Project Name: </label><br/>
                    <input type="text" name="projectName" placeholder="Enter a name..." onChange={this.handleChange}/><br/>
                    <label>Project identifier: </label><br/>
                    <input type="text" name="projectIdentifier" placeholder="Enter a project identifier..." onChange={this.handleChange}/><br/>
                    <label>Description: </label><br/>
                    <textarea name="description" placeholder="Enter description..." onChange={this.handleChange}/><br/>
                    <label>Start: </label><br/>
                    <input type="date" name="start_date" placeholder="dd/mm/yyyy" onChange={this.handleChange}/><br/>
                    <label>End: </label><br/>
                    <input type="date" name="end_date" placeholder="dd/mm/yyyy" onChange={this.handleChange}/><br/>
                    {/*Submit data button*/}
                    <button type="submit" id="submit-button">Submit</button>
                </form>
        </div>);
    }
}
export default AddProjects;