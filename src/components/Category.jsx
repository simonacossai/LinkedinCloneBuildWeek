import React, { Component } from 'react'
import {Card,  ListGroup, Alert} from 'react-bootstrap'
import SideCard from './SideCard'
import {FaAngleDown, FaAngleUp } from "react-icons/fa"


export default class Category extends Component {

    state={
        all_users_profile: this.props.usersProfile,
        display_users: [],
        showMore: false
    }
  
   
    componentDidMount(){
        this.setState({all_users_profile : this.props.usersProfile})
        this.showLessUsers()
    }
    
    
    showLessUsers = () => {
       !this.state.showMore && this.setState({display_users: this.state.all_users_profile.slice(0,5), showMore: true })
    }

    showMoreUsers = () => {
        this.state.showMore && this.setState({display_users: this.state.all_users_profile.slice(0,10), showMore: false })
    }

    
    render() {
        return (
            <Card className="mt-4" style={{ width: '20rem', borderRadius:"12px"}} >
                <Card.Title className="text-left m-0 p-0 pt-4 px-3"> <h2 style={{fontSize:"1em"}}>{this.props.title}</h2></Card.Title>
                <Card.Body className="text-left m-0 p-0  pt-4 px-3">
                    {
                        this.state.display_users.map(user =>  <SideCard key={user._id }imgSrc={user.image} title={user.name + " " + user.surname} description={user.title}  />)
                    }
                </Card.Body>
               
                <ListGroup.Item action className="text-center" onClick ={this.state.showMore ? this.showMoreUsers: this.showLessUsers}>
                   {this.state.showMore ? (<>Show more <FaAngleDown /></>) : (<>Show less <FaAngleUp /></>) } 
                </ListGroup.Item>
            </Card>
        )
    }
}
