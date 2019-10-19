import React, { Component,Fragment } from 'react'
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
import Response from "./Response"


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
                    
                    <tr >
                        <th><img src="http://www.jscens.hcmut.edu.vn/img/BK.png" width="70" height="70"></img></th>
                        <th><p style= {{fontSize :"150%",marginLeft :"20px",color:"#7094db"}}>STUDENT'S FEEDBACK TOOL</p>
                            <p style= {{fontSize :"100%", marginLeft:"20px",color:"#0d0d0d"}}>Use AI to automatically classify sentiment</p>
                        </th>
                        <th style={{marginRight:"1rem "}}>
                            <Button color="primary" className='ml-auto'>{<Logout/>}</Button>
                            
                        </th>
                    </tr>
                    </body>
                </div>
                    <Fragment>
                    <tr>
                    <th style={{borderRight:"4rem"}}><h1>Feedbacks</h1></th> 
                    <th><p>Total:{this.props.feedback.feedbacks.length}</p></th>
                    </tr>
                    </Fragment>
                    {/* <ListGroup>  */}
                            
                            {feedbacks.map(({_id,name,feedback,id,email,Sentiment_status,date})=>(
                                    
                                    // <ListGroupItem key = {_id} >
                                    <div key={_id} style={{width:"1000px",margin:"0",border:"solid grey" }}>
                                        {this.props.isAuthenticated?(
                                            <Button className = 'remove-btn' color = 'danger' size = 'sm' onClick = {this.onDeleteClick.bind(this,_id)} style={{marginLeft:"65rem"}} >
                                                x
                                            </Button>):null}
                                        
                                        <div style={{float:"left"}}>
                                        <h4>{name}</h4>  
                                        <p>{feedback}</p>
                                        <p>{id}</p>
                                        <p>{email}</p>
                                        </div>
                                        
                                        {Sentiment_status >0?(
                                            <div style={{backgroundColor:"green", borderRadius:"6px",color:"white", padding:" 5px 0 0 5px" , marginLeft:"50rem",marginRight:"8rem"}}>Positive</div>
                                        ):(<div style={{backgroundColor:"yellow", borderRadius:"6px",color:"white", padding:" 5px 0 0 5px", marginLeft:"50rem",marginRight:"8rem"}}>Negative</div>)}
                                        <Button className = 'remove-btn' color = 'danger' size = 'sm' onClick = {this.onDeleteClick.bind(this,_id)} style={{marginLeft:"60rem",marginBottom:"8rem"}} >
                                                x
                                        </Button>
                                        <div style={{marginLeft:"45 rem",marginRight:"8rem"}}><span>{date.substring(0,10)}</span></div>
                                        <span sytle={{marginBottom:"2rem"}}><Response email={email}/></span>
                                        <div style={{clear:'left'}}/>
                                            
                                        
                                        
                                        
                                    </div>
                                    // </ListGroupItem>
                            
                            ))}
                    
                    {/* </ListGroup> */}

                    {/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle ={this.toggle}>Response to  feedback></ModalHeader>/ModalHeader>
                    <ModalBody> */}
                    {/* <Form onSubmit={this.onSubmit} id="my-form">
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
                        
                    </Form >      */}
                    {/* </ModalBody>                  
                    </Modal> */}
                </Container>
                </div>
                
                )}}
                
            
    


const mapStateToProps = (state) =>({
    feedback : state.feedback,
    isAuthenticated : state.auth.isAuthenticated,
    response : state.response
})



export default connect(mapStateToProps,{getFeedbacks,deleteFeedback,addResponse})(CMS)
