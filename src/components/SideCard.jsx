import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import Description from "./Description";
import ImageContainer from "./ImageContainer";
import Title from "./Title";
import { CgUserAdd } from "react-icons/cg";
import {FaUserPlus} from 'react-icons/fa';
import '../styles/Experience.css';

export default class SideCard extends Component {
  state = {};

    render() {
        return (
         
                <Row className="py-2  px-2 border-bottom" style={{borderColor: "grey"}}>
                    
                    <Col md={3}><ImageContainer imgSrc={this.props.imgSrc} /></Col>
                    <Col md={9} >
                        <Row className="justify-content-center align-items-center p-0 m-0" style={{color: "black", textDecoration:"none"}}>
                            <Col md={10} >
                                <Title title={this.props.title}  className="title-side-card" style={{width:"50px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}/>
                                <Description description={this.props.description}  style={{color: "black", textDecoration:"none", width:"50px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}/>
                            </Col>
                            <Col md={2}  >
                                <span className="border border-secondary rounded-circle d-flex p-0 mr-5" style={{width:"20px" , height : "20px", marginRight: "5px"}}>
                                    <FaUserPlus className="m-auto"  style={{color: "black", textDecoration:"none"}}/>
                                </span>
                                
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
           
        )
    }
}
