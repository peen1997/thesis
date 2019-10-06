import React, { Component } from 'react'
import {
    ModalBody,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addResponse} from '../actions/responseActions'


export class Response extends Component {
    state = {
        modal :false,
        email : '',
        isReply:'',
        response :''
    }
    static propTypes ={
        isAuthenticated : PropTypes.bool,
        addResponse : PropTypes.func.isRequired
    }
    toggle = ()=> {
        this.setState({
            modal : !this.state.modal
        })
    }
    
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault()

        const emailResponse = {
            
            response : this.state.response,
            email : this.props.email
        }
        
        this.props.addResponse(emailResponse)
        this.toggle()
        
    }

    render() {
        return (
            <div>
                <Button onClick ={this.toggle}>Reply</Button>
                <Modal 
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Response to feedback</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                            <Input type = 'textarea' name = 'response' id ='response' placeholder="Fill text here" onChange={this.onChange}/> 
                            <FormText>This will be sent directly to student</FormText>
                            <Button color= 'primary' style ={{marginRight:"2rem"}}>Send</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>    
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    response : state.response,
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{addResponse})(Response)
