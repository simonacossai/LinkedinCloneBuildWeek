import React, { Component } from 'react'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { AiFillQuestionCircle } from 'react-icons/ai';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import logo from './../assets/logo.png';
import './Profile.css'

export default class AnnounceCard extends Component {
    render() {
        return (
                <Card style={{ width: '20rem', borderRadius:"12px"}} className="mt-3 pb-2">
                                <Card.Header style={{backgroundColor:"transparent"}}><p className="m-0 p-0 text-right">Announce  <HiOutlineDotsHorizontal/></p> </Card.Header>
                                <Card.Body className="m-0 p-2">
                                <p className="m-0 p-0 text-center" style={{fontSize:"13px"}}>Get ahead with competition with linkedin ads</p> 
                                    <Card.Text className="mt-2">
                                       <img src={logo} className="image-announce mr-3" />
                                       <img src={logo} className="image-announce" />
                                       <p className="m-0 mt-1 p-0 text-center" style={{fontSize:"17px"}}>Start off with $50 in free ads</p> 
                                        <Button className="request-announce-button">Request $50 credit</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card> 
            
        )
    }
}