import React, { Component} from "react";
import "../styles/Experience.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Row,Col,ListGroup} from "react-bootstrap";
import { FaPlus,FaAngleDown } from "react-icons/fa";
import ExperienceModal from "./ExperienceModal";
import SingleExperience from "./SingleExperience";
import { Link } from "react-router-dom";

class Experience extends Component {

  state = {
    add: false,
    edit: false,
    experience: [],
   
  }

  

  handleAddClose = () => this.setState({add: false});
  handleAddOpen = () => this.setState({add: true});
  handleEditClose = () => this.setState({edit: false});
  handleEditOpen = () => this.setState({edit: true});

  url = `https://striveschool-api.herokuapp.com/api/profile/${process.env.REACT_APP_USER_ID}/experiences`
  getExperience = async () => {
    try{
      let response = await fetch(
        this.url,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          }),
        }
      );
      if(response.ok){
        let responseExperience = await response.json();
        this.setState({experience: responseExperience})
  
      }
      
    }catch(e){
        
    }
  };

  componentDidMount(){
    this.getExperience();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.experience !== this.state.experience) {
      this.getExperience();
    }
  }

  render(){
   
    return (
      <div>
        <Card className="experience-container my-2">
          <Card.Body>
            <Row className="justify-content-between">
              <Col className="d-flex justify-content-start">
                <Card.Title classname="card-title-expereince d-flex justify-content-start">
                  Experience
                </Card.Title>
              </Col>
              <Link to="/profile/edit/position/new"><Col className="d-flex justify-content-end">
               { <FaPlus onClick={this.handleAddOpen} />} 
              </Col></Link>
            </Row>
  
            {this.state.experience &&
              this.state.experience.map((element) =>  ( 
                <SingleExperience key={element._id} experience={element} onClick={this.handleEditOpen}/>
              ))}
          </Card.Body>
          <ListGroup.Item action className="text-center ">
            Show more
            <FaAngleDown />
          </ListGroup.Item>
        </Card>
        {this.state.add && <ExperienceModal show={this.state.add} add={this.state.add} onHide={this.handleAddClose} />}
        {this.state.edit && <ExperienceModal show={this.state.edit} edit={this.state.edit} onHide={this.handleEditClose} experience_id = {this.props.experience_id} />}
      </div>
    );
  }
 
}

export default Experience