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
    FormText,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addFeedback} from '../actions/feedbackAction'
import 'bootstrap/dist/css/bootstrap.css'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal';


class FeedbackModal extends Component {
    state = {
        isOpen : false,
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

    onClick = () => {
        this.setState({
            isOpen : !this.state.isOpen
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
            
            <div class="d-md-flex h-md-100 align-items-center">
                <div class="col-md-6 p-0 bg-indigo h-md-100">
                    <div class="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                        <div class="logoarea pt-5 pb-5">
                            First half content here
                        </div>
                    </div>
                </div>


                <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
                <h1 style= {{marginBottom :"10px",marginLeft:"20px"}}>STUDENTS' FEEDBACKS TOOL </h1>
                    <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center" id="formContent">
                    <Card>
                    <CardTitle>Feedback</CardTitle>
                    <CardBody>
                    <Form onSubmit={this.onSubmit} id="my-form">
                        <Label for = "Fullname" >Full name</Label>
                        <Input type='text' name='name' id='name' placeholder="Your full name" onChange={this.onChange}></Input>

                        <Label for = "Fullname" >Email</Label>
                        <Input type='email' name='email' id='email' placeholder="Your email address" onChange={this.onChange}></Input>
                    
                        <Label for = "StudentID" >Student ID</Label>
                        <Input type='text' name='id' id='id' placeholder="Your student ID" onChange={this.onChange}></Input>
                    
                        <Label for="FeedbackArea" >Your Feedback</Label>
                        <Input type="textarea" name="feedback" id="feedback" onChange={this.onChange}/>
    
                    {/* <FormGroup row>
                        <Label for="File" sm={2}>File</Label>
                        <Col sm={10}>
                            <Input type="file" name="file" id="file" />
                        </Col>
                        <FormText color = "muted">
                            This file only accepts image format
                        </FormText>
                    </FormGroup>
                    <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}> */}
                        <Button color ="primary">Send</Button>
                    {/* </Col> */}
                    {/* </FormGroup> */}
                        </Form>
                        {/* <div id="formFooter">
                            <a class="underlineHover" href="#">Forgot Password?</a>
                        </div> */}
                        </CardBody>
                    <Button onClick = {this.toggle}>{<LoginModal/>}</Button>
                        <Button onClick = {this.toggle}>{<RegisterModal/>}</Button>
                        </Card>
                    </div>
                    
                </div>
            
            </div>
                    
        </div>        
        )
    }
    }

const mapStateToProps = (state)=>({
    feedback : state.feedback,
    isAuthenticated : state.auth.isAuthenticated
})
    
export default connect(mapStateToProps,{addFeedback})(FeedbackModal)