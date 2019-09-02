import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,  
    Col,
    FormText
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addFeedback} from '../actions/feedbackAction'

class FeedbackModal extends Component {
    state = {
        modal : false,
        name : '',
        email : '',
        id : '',
        feedback : ''
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool
    }
    toggle = () => {
        this.setState({
            modal : !this.state.modal
        })
    }

    onChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = e=>{
        e.preventDefault()

        const newFeedback = {
            name : this.state.name,
            email : this.state.email,
            id : this.state.id,
            feedback : this.state.feedback
        }

        this.props.addFeedback(newFeedback)
        // close modal
        this.toggle()
        document.getElementById("my-form").reset()
    }

    render() {
        return (
        <div>
            <h1 style= {{marginBottom :"10px",marginLeft:"20px"}}>STUDENTS' FEEDBACKS TOOL IN BACH KHOA UNIVERSITY</h1>
            <Form onSubmit={this.onSubmit} id="my-form">
                <FormGroup row>
                    <Label for = "name" sm={2}>Full Name</Label>
                    <Col sm={10}>
                        <Input type='text' name='name' id='name' placeholder="Your full name" onChange={this.onChange}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for = "email" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input type='email' name='email' id='email' placeholder="Your email address" onChange={this.onChange}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for = "StudentID" sm={2}>Student ID</Label>
                    <Col sm={2}>
                        <Input type='text' name='id' id='id' placeholder="Your student ID" onChange={this.onChange}></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="FeedbackArea" sm={2}>Your Feedback</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="feedback" id="feedback" onChange={this.onChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="File" sm={2}>File</Label>
                    <Col sm={10}>
                        <Input type="file" name="file" id="file" />
                    </Col>
                    <FormText color = "muted">
                        This file only accepts image format
                    </FormText>
                </FormGroup>
                <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                </Col>
                </FormGroup>
            </Form>            
        </div>        
        )
    }
    }

const mapStateToProps = (state)=>({
    feedback : state.feedback,
    isAuthenticated : state.auth.isAuthenticated
})
    
export default connect(mapStateToProps,{addFeedback})(FeedbackModal)