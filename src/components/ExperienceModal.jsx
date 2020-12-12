import { ImageAspectRatio } from '@material-ui/icons';
import React, { Component } from 'react'
import { Modal, Button, Form, Col, InputGroup, FormControl, Alert } from 'react-bootstrap';
import {FcAddImage}  from'react-icons/fc';

require('dotenv').config()

export default class Experience_Modal extends Component {
    state = {
        experience: {
            role: "",
            company: "",
            startDate: "",
            endDate: "", //could be null
            description: "",
            area: "",
        },
        image: "",
        experience_id: "",
        delete: false,
        update: false,
        add: false,
        working: false,
        uploading: false,
        images: []
    }


    HandleFile = (e) => {
        const formData = new FormData();
        formData.append("experience", e.target.files[0]);
        this.setState({ image: formData })
    };


    url = `https://striveschool-api.herokuapp.com/api/profile/${process.env.REACT_APP_USER_ID}/experiences`

    updateField = (e) => {
        let experience = { ...this.state.experience }
        let currentId = e.currentTarget.id
        experience[currentId] = e.currentTarget.value
        this.setState({ experience })
    }

    PostImage = async (id) => {
        try {
            let response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${process.env.REACT_APP_USER_ID}/experiences/${id}/picture`,
                {
                    method: "POST",
                    body: this.state.image,
                    headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                }
            );
            if (response.ok) {
                this.getUserExperience()
            } else {
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(this.url, {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(this.state.experience),
            })
            if (response.ok) {
                let data = await response.json();
                this.PostImage(data._id);
                this.props.onHide()
                alert("Experience Added");
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            alert(`Something went wrong! ${error}`)
        }
    }

    handleUpdate = async (e) => {
        e.preventDefault();
        try {
            this.getUserExperience()
            let response = await fetch(this.url + "/" + this.state.experience_id, {
                method: "PUT",
                headers: new Headers({
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(this.state.experience),
            })
            if (response.ok) {
                let data = await response.json();
                this.PostImage(data._id);
                this.getUserExperience()
                this.props.onHide()
                alert("Experience Updated");
            } else {
                alert("Something went wrong!");
            }

        } catch (error) {
            alert(`Something went wrong! ${error}`)
        }
    }

    handleDelete = async (e) => {
        e.preventDefault();
        e.preventDefault();
        try {
            let response = await fetch(this.url + "/" + this.state.experience_id, {
                method: "DELETE",
                headers: new Headers({
                    "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                    "Content-Type": "application/json",
                })
            });
            if (response.ok) {
                alert("Experience Deleted");
                this.props.onHide()
            }
            else {
                alert("Something went wrong!")
            }
        } catch (error) {
            alert(`Something went wrong! ${error}`)
        }
    }

    getUserExperience = async () => {
        if (this.props.edit) {
            try {
                let response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${process.env.REACT_APP_USER_ID}/experiences/${this.state.experience_id}`, {
                    "method": "GET",
                    "headers": new Headers({
                        "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
                    })
                })
                if (response.ok) {

                    let userExperience = await response.json();

                    let experience = userExperience.find(experience => experience._id === this.state.experience_id)
                    let expe = { ...this.state.experience }
                    expe.role = experience.role
                    expe.area = experience.area
                    expe.company = experience.company
                    expe.description = experience.description
                    expe.endDate = experience.endDate
                    expe.startDate = experience.startDate
                    this.setState({ experience: expe });
                } else {
                    Alert("An error occured")
                }
            } catch (error) {

            }
        }
    }



    removeImage = id => {
        this.setState({
            images: this.state.images.filter(image => image.publiic_id !== id)
        })
    }
    componentDidMount(previousProps) {
        if (this.props.experience_id !== "") {
            this.setState({ experience_id: this.props.experience_id })
        }

        if (this.props.edit) {
            this.getUserExperience();
        }
    }

    render() {

        return (
            <div>
                <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        {this.props.add && <Modal.Title>Add experience</Modal.Title>}
                        {this.props.edit && <Modal.Title>Edit experience</Modal.Title>}
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}  >
                        <Modal.Body style={{ overflowY: "scroll", maxHeight: "60vh" }}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="role">Title *</Form.Label>
                                    <Form.Control type="text" id="role" placeholder="Ex: Retails Sales Manager"
                                        value={this.state.experience.role}
                                        onChange={this.updateField} />
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label htmlFor="company">Company *</Form.Label>
                                    <Form.Control id="company" type="text" placeholder="e.g Strive School"
                                        value={this.state.experience.company}
                                        onChange={this.updateField} />
                                    <span></span>
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>Start Date *</Form.Label>

                                    <Form.Control
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        placeholder="Start Date"
                                        value={this.state.experience.startDate}
                                        onChange={this.updateField}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>End Date *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        placeholder="End Date"
                                        value={this.state.experience.endDate}
                                        onChange={this.updateField}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control id="description" as="textarea" rows={3} value={this.state.experience.description} onChange={this.updateField} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="area">Location</Form.Label>
                                    <Form.Control id="area" type="text" placeholder="Ex: London, United Kingdom"
                                        value={this.state.experience.area}
                                        onChange={this.updateField} />
                                    <span></span>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col}>
                                    <Form.Label><span>Media</span><br />
Add or link to external documents, photos, sites, videos, and presentations.</Form.Label>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <label for="file" id="file-label">
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={this.HandleFile}
                                                    accept="image/*"
                                                />
                                                <FcAddImage className="upload" />
                                            </label>                                        </Form.Group>
                                    </Form.Row>
                                </Form.Group>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Form.Row className="justify-content-bewteen">
                                {this.props.edit && <><Form.Group as={Col} md={6} >
                                    <Button variant="outline-secondary" className="rounded-pill" onClick={this.handleDelete}  >
                                        Delete
                                    </Button>
                                </Form.Group> <Form.Group as={Col} md={6} >
                                        <Button variant="primary" className="rounded-pill" onClick={this.handleUpdate}>
                                            Save
                                    </Button>
                                    </Form.Group> </>}
                                {this.props.add && <> <Form.Group as={Col} md={6} >
                                    <Button variant="primary" type="submit" className="rounded-pill">
                                        Save
                                    </Button>
                                </Form.Group> </>}
                            </Form.Row>

                        </Modal.Footer>
                    </Form>
                </Modal >
            </div >
        )
    }
}