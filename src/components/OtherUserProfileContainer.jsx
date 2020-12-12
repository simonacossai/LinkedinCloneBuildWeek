import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/Profile.css";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

require("dotenv").config();

export default class ProfileContainer extends Component {
  render() {
    return (
      <Card className="card-user-profile">
        <Card.Img
          variant="top"
          src="https://cuborosso.com/wp-content/uploads/2019/10/linkedin-background-image-elegant-awesome-linkedin-cover-ideas-pilation-of-linkedin-background-image.jpg"
          className="coverImage image-fluid"
        />
        <Card.Body>
          <img src={this.props.userProfile.image} className="profile-image" />
          <div className="buttons">
            <Button className="add-profile-button mr-2">
              Add profile section{" "}
              <RiArrowDownSFill
                className="m-0 p-0"
                style={{ fontSize: "17px" }}
              />
            </Button>
            <Button className="more-button mr-1 py-0">More...</Button>
            <Button className="pencil-edit-button">
              <FaPencilAlt />
            </Button>
          </div>
          <Card.Text className=" text-left text-black">
            <h3>
              {this.props.userProfile.name ?? "name"}{" "}
              {this.props.userProfile.surname ?? "surname"}
            </h3>
            <h5>{this.props.userProfile.title ?? "user job"}</h5>
          </Card.Text>
          <Card.Text className=" text-left text-black d-flex">
            <p className="p-0 m-0">{this.props.userProfile.area} • </p>
            <p className="p-0 m-0" type="email">
              {this.props.userProfile.email} •{" "}
            </p>
            <a className="p-0 m-0 ml-2">500+ connections</a>
            <p className="p-0 m-0 ml-2"> • </p>
            <a className="p-0 m-0 ml-2">More info</a>
          </Card.Text>
        </Card.Body>
        <Card className="mx-3 p-0 mb-4">
          <Card.Header as="p" className="text-left p-2 m-0">
            <div className="d-flex justify-content-between">
              <p className="p-0 m-0">Open to work</p>{" "}
              <FaPencilAlt className="text-right" />
            </div>
            <p className="p-0 m-0">Frontend Web Developer roles</p>
          </Card.Header>
          <Card.Body className="p-0 m-0">
            <Card.Text className="p-0 m-0 d-flex align-items-center">
              <AiFillEye className="p-0 my-0 text-black mx-2 d-flex align-items-center" />{" "}
              <p className="p-0 m-0 text-left">Only recruiters</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Card>
    );
  }
}
