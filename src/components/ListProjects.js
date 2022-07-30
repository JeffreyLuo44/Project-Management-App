import React, { Component } from 'react';
import '../css/index.css';
import { FaTimesCircle } from 'react-icons/fa';
import Moment from 'react-moment';
import $ from 'jquery';

class ListProjects extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }
    
    //Search project items' information by id through jquery filtering for every key input
    search(){
        for (let i=1; i<=this.props.projects.length; i++){
            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#"+i.toString()).filter(function() {
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });  
            });
        }
    };
    
    //What the component should display
    render(){
        return ( 
        <div id="project-list" className="project-list">
            {/*Search input control*/}
            <input id="myInput" type="text" placeholder="Search..." onChange={this.search}/>
            {/*Sort by dropdown selection control*/}
            <select id="sortVariable" name="sortVariable" onChange={this.props.handleSort} defaultValue="">
                <option value="" hidden disabled>Sort by...</option>
                <option value="0">Project Name</option>
                <option value="1">Start Date</option>
            </select>
            {/*Sort direction dropdown selection control*/}
            <select id="sortUpDown" name="sortUpDown" onChange={this.props.handleSort} defaultValue="">
            <option value="" hidden disabled>Sort direction is...</option>
                <option value="0">Ascending</option>
                <option value="1">Descending</option>
            </select>
            {/*Listing all the projects and importantly giving them a unique key, project identifier, to give div element a stable identity*/}
            {this.props.projects.map( item => (
                <div className="project-item" key={item.projectIdentifier} id={item.projectIdentifier}>
                    {/*Delete project "X" circle button*/}
                    <button className="project-delete" onClick={() => this.props.deleteProject(item)}> <FaTimesCircle/> </button>
                    {/*Project information - Project identifier, start date, end date, project name and project description*/}
                    <div className="project-info">
                        <div className="project-header">
                            <span>Project {item.projectIdentifier} -</span>
                            <span> <Moment date={item.start_date}
                                parse="YYYY-MM-DD hh:mm"
                                format="DD MMM YYYY" />
                            </span>
                            <span> to <Moment date={item.end_date}
                                parse="YYYY-MM-DD hh:mm"
                                format="DD MMM YYYY" />
                            </span>
                        </div>
                        <div className="project-name">
                            <h2>{item.projectName}</h2>
                        </div>
                        <div className="project-description">
                            <span>{item.description}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div> );}
}
export default ListProjects