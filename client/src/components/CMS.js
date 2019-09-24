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
    ListGroupItem,
    Collapse

} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getFeedbacks,deleteFeedback} from '../actions/feedbackAction'
import {addResponse} from '../actions/responseActions'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import Logout from "./auth/Logout"


export class CMS extends Component {
    state = {
        modal : false , 
        email : '',
        response : '',
        response_id : '',
        countID : 0
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        feedback : PropTypes.object.isRequired,
        getFeedbacks : PropTypes.func.isRequired,
        deleteFeedback : PropTypes.func.isRequired
    }
 
    toggle = ()=> {
        this.setState({
        modal : !this.state.modal
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
        document.getElementById("my-form").reset()
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
        console.log(this.props.feedback.feedbacks.length)
        return (
            <div>
                <Container>
                <div>
                    <body >
                    <h1>{this.props.feedback.feedbacks.length}</h1>   
                    <tr >
                        <th><img src="http://www.jscens.hcmut.edu.vn/img/BK.png" width="70" height="70"></img></th>
                        <th><p style= {{fontSize :"150%",marginLeft :"20px",color:"#7094db"}}>STUDENT'S FEEDBACK TOOL</p>
                            <p style= {{fontSize :"100%", marginLeft:"20px",color:"#0d0d0d"}}>Use AI to automatically classify sentiment</p>
                        </th>
                        <th >
                            <Button color="primary" className='ml-auto'>{<Logout/>}</Button>
                            
                        </th>
                    </tr>
                    </body>
                </div>
                    
                    <ListGroup> 
                            
                            {feedbacks.map(({_id,name,feedback,id,email,Sentiment_status,date})=>(
                                    
                                    <ListGroupItem key = {_id} >
                                        {this.props.isAuthenticated?(
                                            <Button className = 'remove-btn' color = 'danger' size = 'sm' onClick = {this.onDeleteClick.bind(this,_id)} >
                                                x
                                            </Button>):null}
                                            
                                        {name}
                                        {feedback}
                                        {id}
                                        {email}
                                        {Sentiment_status >0?
                                            (<img src='https://cdn0.iconfinder.com/data/icons/emoticons-round-smileys/137/Emoticons-01-512.png' height = '30px' width='30px'></img>):(<img src='data:image/png;base64,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' width ='30px' height= '30px'>
                                            </img>)}
                                        {date.substring(0,10)}
                                    </ListGroupItem>
                            
                            ))}
                    
                    </ListGroup>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle ={this.toggle}>Response to  feedback></ModalHeader>
                    <ModalBody>
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
                    </ModalBody>                  
                    </Modal>
                </Container>
                </div>
                
                )}}
                
            
    


const mapStateToProps = (state) =>({
    feedback : state.feedback,
    isAuthenticated : state.auth.isAuthenticated
})



export default connect(mapStateToProps,{getFeedbacks,deleteFeedback,addResponse})(CMS)
