import React, { Component,Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

class AppNavbar extends Component { 
    state = {
        isOpen : false
    }
    // initialize type for props
    static propTypes = {
        auth : PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    
    render() {
        const {isAuthenticated,admin} = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{admin?`Welcome ${admin.name}`:''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className = "mb-5">
                    <Container>
                        <NavbarBrand href='/'>Feedback</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen = {this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                {isAuthenticated ?authLinks:guestLinks}
                            </Nav>
                    </Collapse> 
                </Container>
            </Navbar>
        </div>
    )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
})
export default connect(mapStateToProps,null)(AppNavbar)
