import React, { Component } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
import ProfileContainer from './ProfileContainer';
import '../styles/Profile.css'
import ModifyProfileCard from './ModifyProfileCard';
import AnnounceCard from './AnnounceCard';
import Dashboard from './Dashboard';
import Category from './Category';
import Interests from './Interests';
import Experience from './Experience';
import Loader from './Loader';
import Footer from './Footer';


export default class ProfileComponent extends Component {
  state = {
    userProfile: {},
    allUsersProfile: [],
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
    let userProfile = await response.json();
    this.setState({ userProfile });
  };

  getUsersProfile = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/",
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        }),
      }
    );
    if (response.ok) {
      let allUsersProfile = await response.json();
      this.setState({ allUsersProfile });
    } else {
      <Alert>Opps, an error occured: </Alert>;
    }
  };

  componentDidMount() {
    this.getUserProfile();
    this.getUsersProfile();
  }

  componentDidUpdate() {
    if (this.state.showMore) {
      this.showUsers();
      this.setState({ showMore: false });
    }
  }

    render() {
     
        return (
            <>
                <Container>
                    <Row className="mt-5">
                        <Col md={8}>
                            {this.state.userProfile.length !== 0 ? <ProfileContainer userProfile={this.state.userProfile} /> :  <Loader />}
                            <Dashboard />
                            <Experience experience_id = {this.props.match.params.id}/>
                            <Interests/>
                        </Col>
                        <Col md={4} style={{flexDirection:"column", display:"flex", justifyContent:"start", alignItems:"center", textAlign:"center"}}>
                           <ModifyProfileCard/>
                           <AnnounceCard/>
                           {this.state.allUsersProfile.length !== 0 ?<> <Category title="People also viewed" usersProfile ={this.state.allUsersProfile} />
                           <Category title="People you may know" usersProfile ={this.state.allUsersProfile.slice(5)} /> 
                            </>:  <Loader />}                      
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </>
        )
    }
}
