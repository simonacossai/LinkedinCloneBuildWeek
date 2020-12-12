import React, { Component } from 'react'
import '../styles/SinglePost.css';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {AiOutlineLike} from 'react-icons/ai';
import {RiMessageLine} from 'react-icons/ri';
import {IoMdShareAlt} from 'react-icons/io';
import {RiSendPlaneFill} from 'react-icons/ri';
import { Card, Container, Row, Col, Button, Spinner, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import {BsTrashFill} from 'react-icons/bs';
import {BsBookmarkFill, BsFillEyeFill} from 'react-icons/bs';
import Loader from './Loader';

import NewPostModal from './NewPostModal';
export default class SinglePost extends Component {
    state = {
        user:[],
        open: true,
        show: false,
        click: false,
        id: "",
        post: {
            text: "",
        }

    }

    clickLike=()=>{
        this.setState({click: !this.state.click});
    }
    handleClose = () => {
        this.setState({ show: false });
        this.setState({post:{ text: ""}})
    }
    handleShow = (id) => {
        this.setState({ show: true });
        if (id) {
            this.setState({ post: { text: id } })
        }
    }
    getUserProfile=async()=>{
        let response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me",{
            "method": "GET", 
            "headers": new Headers({
                "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
            })
        })
        let user = await response.json();
        this.setState({user});
    }

    componentDidMount(){
        this.getUserProfile();
    }
    handleDelete = async (id) => {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/posts/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
        if (response.ok) {
            alert("deleted successfully");
            this.props.fetch();
        }

    }
    handleUpdate = async (id) => {
        try {
            let response = await fetch(
                `https://striveschool-api.herokuapp.com/api/posts/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(this.state.post),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    post: { text: "" },
                });
                this.props.fetch()
                this.setState({ show: false });

            } else {
                let error = await response.json();
                console.log(error);
            }
        } catch (e) {
            console.log(e);
        }
    }


    updatePostField = (e) => {
        this.setState({ post: { text: e.target.value } });
    };


    render() {
        return (
            <div>
                <Card className="d-block mt-3 postCard" key={this.props.post._id}>
                    <Card.Body className="px-0">
                        <Row >
                            <Col md={2} className="p-0 m-0 ml-2">
                                <img src={this.props.post.user.image} className="postProfilePic" />
                            </Col>
                            <Col md={9} className="p-0 m-0 d-flex align-items-center justify-content-between">
                                <p className="text-left p-0 m-0">{this.props.post.username}</p>
                                {this.props.post.username === process.env.REACT_APP_USER_NAME ?
                                 <DropdownButton
                                 style={{backgroundColor:"#ffff"}}
                                 className="dropdown-post"
                                 id="dropdown-post"
                                 >
                                 <Dropdown.Item eventKey="1"  onClick={() => this.handleShow(this.props.post.text)}><BsPencilSquare className="mr-2"/>Edit this post</Dropdown.Item>
                                 <Dropdown.Item eventKey="2" onClick={() => this.handleDelete(this.props.post._id)}><BsTrashFill className="mr-2" />Delete this post</Dropdown.Item>
                                 <Dropdown.Item eventKey="3"><BsBookmarkFill className="mr-2"/>Save this post</Dropdown.Item>
                                 <Dropdown.Divider />
                                 <Dropdown.Item eventKey="4"><BsFillEyeFill className="mr-2"/>Who can see this?</Dropdown.Item>
                             </DropdownButton>
                                     : <BiDotsHorizontalRounded className="dot-icon" />
                                }</Col>
                        </Row>
                        <Card.Text className="text-left mt-3 px-1">
                            {this.props.post.text}
                        </Card.Text>
                    </Card.Body>

                    {this.props.post.image && <Card.Img variant="bottom" src={this.props.post.image} style={{height: "400px", objectFit:"cover"}}/>}

                    <Card.Footer className="text-muted">
                        <Row>
                            <Col md={3} className="m-0 p-0" style={this.state.click ? {color: "#0069D9"}: {color: "grey"}}>
                                <AiOutlineLike className="mr-1" onClick={()=>this.clickLike()}/>Like
                            </Col>
                            <Col md={3} className="m-0 p-0">
                                <RiMessageLine  className="mr-1"/>Comment
                            </Col>
                            <Col md={3} className="m-0 p-0">
                                <IoMdShareAlt  className="mr-1"/>Share
                            </Col>
                            <Col md={3} className="m-0 p-0">
                                <RiSendPlaneFill  className="mr-1"/>Send
                            </Col>
                        </Row>
                    </Card.Footer>
                    <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update your post!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row>
                            <Col md={6} className="d-flex">
                                <img className="profile-picture-modal" src={this.state.user.image && this.state.user.image} />
                                <div className="d-block"><p className="ml-3 text-black m-0 p-0">{this.state.user.name && this.state.user.name} {this.state.user.surname && this.state.user.surname}</p>
                                    <Form.Control as="select" custom className="postSelect ml-2 py-0">
                                        <option>🌏Everyone</option>
                                        <option>Your network</option>
                                        <option>only me</option>
                                    </Form.Control>
                                </div>
                            </Col>
                        </Row>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="what do you want to talk about?"
                                        style={{ border: "none", boxShadow:"none" }}
                                        value={this.state.post.text}
                                        id="text"
                                        onChange={(e) => this.updatePostField(e)}
                                    />
                                </Form.Group>
                            </Form></Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.handleUpdate(this.props.post._id)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </div>
        )
    }
}


/*<BsPencilSquare onClick={() => this.handleShow(this.props.post.text)} /> */