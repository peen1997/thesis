import React, { Component,Fragment } from 'react'
import FeedbackModal from './FeedbackModal'
import CMS from './CMS'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from './Header'
import AppNavbar from './Navbar'
import {Container} from 'reactstrap'


export class Main extends Component {
    static propTyes = {
        auth : PropTypes.object.isRequired
    }
    render() {
        console.log('props', this.props)
        const {isAutheticated} = this.props.auth
        console.log(isAutheticated)
        const userLink = (
            <Fragment>
                <Header />
                <AppNavbar />
                <FeedbackModal />
            </Fragment>)
        const adminLink = (
            <Fragment>
                <Header />
                <AppNavbar />
                <CMS />
            </Fragment>)
    
        return (
            <Fragment>
                <Header />
                <AppNavbar />
                {this.props.auth.isAuthenticated ? (<CMS/>) : (<FeedbackModal/>)}
            </Fragment>
        )
    
}
}

const mapStateToProps = state =>({
    auth : state.auth
})
export default connect(mapStateToProps,null)(Main)
