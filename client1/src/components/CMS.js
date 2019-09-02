import React, { Component } from 'react'
import {
    Button,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Col,
    FormText,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getFeedbacks,deleteFeedback} from '../actions/feedbackAction'
import {addResponse} from '../actions/responseActions'
import {CSSTransition,TransitionGroup} from 'react-transition-group'


export class CMS extends Component {
    state = {
        dropdownOpen : false , 
        email : '',
        response : '',
        response_id : ''
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        feedback : PropTypes.object.isRequired,
        getFeedbacks : PropTypes.func.isRequired,
        deleteFeedback : PropTypes.func.isRequired
    }
    toggle = ()=> {
        this.setState({
        dropdownOpen : this.state.dropdownOpen
        })
    }
    
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = (e) =>{
        e.preventDefault()

        const emailResponse = {
            response_id : this.state.response_id,
            email : this.state.email,
            response : this.state.response
        }
        // FIXME something wrong here
        this.props.addResponse(emailResponse)
        this.toggle()
}
    // Close modal 
    onDeleteClick = id =>{
        this.props.deleteFeedback(id)
    }
    componentDidMount(){
        this.props.getFeedbacks()
    }

    render() {
        const {feedbacks} = this.props.feedback
        console.log({feedbacks})
        return (
            <div>
                <Container>
                    <ListGroup> 
                        <TransitionGroup className = 'feedback-list'>
                            {feedbacks.map(({_id,name,feedback,student_ID,email})=>(
                                <CSSTransition key = {_id} timeout = {500} className= 'fade'>
                                    <ListGroupItem>
                                        {this.props.isAuthenticated?(
                                            <Button className = 'remove-btn' color = 'danger' size = 'sm' onClick = {this.onDeleteClick.bind(this,_id)} >
                                                &times
                                            </Button>):null}
                                        
                                        {name}
                                        {feedback}
                                        {student_ID}
                                        {email}
                                        
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                
    
                </Container>
                <Container>
                    <Form onSubmit={this.onSubmit} id="my-form">
                    <FormGroup row>
                        <Label for = "email" sm={2}>EMAIL</Label>
                        <Col sm={10}>
                            <Input type='text' name='email' id='email' placeholder="email" onChange={this.onChange}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for = "response" sm={2}>RESPONSE FIELD</Label>
                        <Col sm={10}>
                            <Input type='textarea' name='response' id='response' placeholder="Your reply for feedback" onChange={this.onChange}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                        </Col>
                        </FormGroup>
                    </Form >
                </Container>
                </div>
                
                )}}
                
            
    


const mapStateToProps = (state) =>({
    feedback : state.feedback,
    isAuthenticated : state.auth.isAuthenticated
})



export default connect(mapStateToProps,{getFeedbacks,deleteFeedback,addResponse})(CMS)
