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
                    <CardTitle style={{marginLeft:"10rem",marginRight:"5rem" ,size:"100px"}} className ="Card_Title">Feedback</CardTitle>
                    <CardBody>
                    <Form onSubmit={this.onSubmit} id="my-form">
                        <Label for = "Fullname"  >FULLNAME</Label>
                        <Input type='text' name='name' id='name' onChange={this.onChange} style={{backgroundColor:"#c6c7ca"}}></Input>

                        <Label for = "Email" >EMAIL</Label>
                        <Input type='email' name='email' id='email'  onChange={this.onChange} style={{backgroundColor:"#c6c7ca"}}></Input>
                    
                        <Label for = "StudentID" >STUDENTID</Label>
                        <Input type='text' name='id' id='id'  onChange={this.onChange} style={{backgroundColor:"#c6c7ca"}}></Input>
                    
                        <Label for="FeedbackArea" >Your Feedback</Label>
                        <Input type="textarea" name="feedback" id="feedback" onChange={this.onChange} style={{width:"400px",height:"200px",backgroundColor:"#c6c7ca"}}/>
    
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
                        <Button color ="primary" style={{marginLeft:"10rem",marginRight:"5rem",marginTop:"2rem"}}>SEND</Button>
                    {/* </Col> */}
                    {/* </FormGroup> */}
                        </Form>
                        {/* <div id="formFooter">
                            <a class="underlineHover" href="#">Forgot Password?</a>
                        </div> */}
                        </CardBody>
                        <p style ={{marginLeft:"12rem",marginRight:"5rem"}}>OR</p>
                        <Button onClick = {this.toggle} color="primary" style={{marginLeft:"10rem",marginRight:"11rem",color:'white'}} active>{<LoginModal/>}</Button>
                        <Button onClick = {this.toggle} color ="link"> {<RegisterModal  />}</Button>
                        </Card>
                        
                        <div >

                        </div>
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