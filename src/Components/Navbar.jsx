import React, { Component } from "react";
import {
  Navbar,
  Container,
  Form,
  Nav,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { RiNotification3Fill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { CgMenuGridR } from "react-icons/cg";
import "../styles/Navbar.css";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/logo.png";
import { Divider } from "@material-ui/core";

class NavBar extends Component {
  state = {
    user: [],
  };
  getUserProfile = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/me",
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        }),
      }
    );
    let user = await response.json();
    this.setState({ user });
  };

  componentDidMount() {
    this.getUserProfile();
  }
  render() {
    return (
      <>
        <Navbar
          variant="light"
          style={{ backgroundColor: "#fff" }}
          className="navbar p-0"
          expand="lg"
        >
          <Container>
            <Navbar.Brand to="#home">
              <img src={logo} alt="logo" className="nav-brand" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline>
                <InputGroup style={{ width: "240px" }}>
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{ backgroundColor: "#EEF3F8", border: "none" }}
                    >
                      <HiSearch />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    style={{ backgroundColor: "#EEF3F8", border: "none" }}
                    type="text"
                    placeholder="Search"
                  />
                </InputGroup>
              </Form>

              <Nav className="ml-auto d-flex align-items-center">
                <Link to="/" >
                  <div className="nav-link pb-0 mb-0"><AiFillHome /><p>Home</p></div>
                </Link>
                <Link to="/" >
                  <div  className="nav-link pb-0 mb-0">
                    <FaUserFriends />
                    <p>My Network</p>
                  </div>
                </Link>
                <Link to="/" >
                  <div className="nav-link pb-0 mb-0">
                    <BsFillBriefcaseFill />
                    <p>Jobs</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="nav-link pb-0 mb-0">
                    <RiMessage2Fill />
                    <p>Messaging</p>
                  </div>
                </Link>
                <Link to="/">
                  <div className="nav-link pb-0 mb-0">
                    <RiNotification3Fill />
                    <p>Notifications</p>
                  </div>
                </Link>
             
               
                
                <Dropdown className="d-flex mr-2">
                  <Nav.Link>
                    <Link to="/">
                    <img src={logo} className="profile-img mr-1" alt="profile image" />
                    <div className="d-flex align-items-baseline">
                    <p>
                        Me{" "}
                      </p><Dropdown.Toggle
                    cssClass="e-caret-hide"
                    menuAlign="right"
                    variant="transparent"  
                    className="nav-link d-flex m-0 p-0"
                    style={{height:"10px", fontSize: "17px",marginTop:"10px", boxShadow: "none"}}
                  >
                  </Dropdown.Toggle>
                    </div>
                     
                    </Link>
                  </Nav.Link>
                  
                  
                  <Dropdown.Menu className="px-2">
                    <Dropdown.Item>
                      <Link to = "/profile">
                        <img
                          style={{ borderRadius: "50%", width:"50px", height:"50px" }}
                          className="align-self-left mr-2"
                          id="profile-image"
                          style={{ borderRadius: "50%" }}
                          src={this.state.user.image}
                          alt="Generic placeholder"
                        />
                        <b>
                          {this.state.user.name} {this.state.user.surname}
                        </b>
                      </Link>
                      
                    </Dropdown.Item>
                    
                     
                    <Dropdown.Item to="/">
                      <Link  to="/profile" ><Button className="request-announce-button" style={{ width: "100%" }}>View Profile</Button></Link>
                    </Dropdown.Item>
                   
        
                    <Dropdown.Divider />
                    <Dropdown.Item to="/">
                       <Link to="#"><b>Account</b></Link>
                    </Dropdown.Item>
                    <Dropdown.Item to="/">
                      <Link to="#">Access My Premium</Link>
                    </Dropdown.Item>
                    <Dropdown.Item to="/">
                      <Link to="#">Settings & Privacy</Link>
                    </Dropdown.Item>
                    <Dropdown.Item ><Link to="/">Help</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to="/">Language</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >
                      <Link to="/"><b>Manage</b></Link>
                    </Dropdown.Item>
                    <Dropdown.Item >
                      <Link to="/">Posts & Acitivties</Link>
                    </Dropdown.Item>

                    <Dropdown.Divider />
                    <Dropdown.Item ><Link to="/" >Sign Out</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
              <Nav className="second-nav">
                <Nav.Link>
                  <Link to="/">
                    <CgMenuGridR />
                    <p>
                      Work{" "}
                      <RiArrowDownSFill
                        className="m-0 p-0"
                        style={{ fontSize: "17px" }}
                      />
                    </p>
                  </Link>
                </Nav.Link>
                
                <Nav.Link
                  className="nav-link"
                  style={{ maxWidth: "70px", textDecoration: "underline" }}
                >
                  <Link to="/"><p style={{ color: "#5D3B09" }}>Reactivate premium</p></Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default withRouter(NavBar);
