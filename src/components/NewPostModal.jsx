import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import '../styles/CreatePostComponent.css';
import { BiWorld } from 'react-icons/bi';
import {FcAddImage}  from'react-icons/fc';

export default class NewPostModal extends Component {

    state = {
        wholePost: {
        text: ""
        },
        showpost: false,
        errMessage: "",
        post: null,
        user:[],
    };

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
        this.getUserProfile()
    }
    updatePostField = (e) => {
        this.setState({  wholePost: { text: e.target.value } });
    };

    HandleFile = (e) => {
        const formData = new FormData();
        formData.append("post", e.target.files[0]);
        this.setState({ post: formData });
    };
    PostImage = async (id) => {
        
        try {
            let response = await fetch(
                `https://striveschool-api.herokuapp.com/api/posts/${id}`,
                {
                    method: "POST",
                    body: this.state.post,
                    headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                }
            );
            if (response.ok) {
                this.props.fetch()
            } else {
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    submitPost = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(
                `https://striveschool-api.herokuapp.com/api/posts/`,
                {
                    method: "POST",
                    body: JSON.stringify(this.state.wholePost),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    wholePost: { text: "" },
                });
                this.PostImage(data._id);
                this.props.fetch()
                this.props.onHide()
            } else {
                let error = await response.json();
                console.log(error);
            }
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide} >
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
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
                                    value={this.state.wholePost.text}
                                    id="text"
                                    onChange={(e) => this.updatePostField(e)}
                                />
                            </Form.Group>
                        </Form>
                        <label for="file" id="file-label">
                        <input
                      type="file"
                      id="file"
                      onChange={this.HandleFile}
                      accept="image/*"
                    />
                    <FcAddImage className="upload" />
                    </label>
                      <Button
                    type="submit"
                    id="post"
                    onClick={this.submitPost}
                    className="post-modal-button justify-content-right d-flex ml-auto "
                  >
                    Post
                  </Button>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}
