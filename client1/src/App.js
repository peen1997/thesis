import React from 'react';
import './App.css';
import AppNavbar from './components/Navbar'
import FeedbackModal from './components/FeedbackModal'
import {Provider} from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
      <Provider store ={store}>
        <div className='App'>
          {/* <Header />
          <AppNavbar />
          <FeedbackModal /> */}
          <Main />
        </div>
      </Provider>
);
}

export default App;



// import React ,{Component} from 'react';
// import './App.css';
// import AppNavbar from './components/Navbar'
// import FeedbackModal from './components/FeedbackModal'
// import {Provider, connect} from 'react-redux'
// import store from './store'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Header from './components/Header'
// import CMS from './components/CMS'
// import PropTypes from 'prop-types'
// import { Container } from 'reactstrap';




// export class App extends Component {
//   static propTypes = {
//     auth : PropTypes.object.isRequired,
//     isAuthenticated : PropTypes.bool
//   }

//   render() {
//     // const {isAuthenticated} = this.props.auth
//     const userLink = (
//     <Container>
//       <Header />
//       <AppNavbar />
//       <FeedbackModal />
//     </Container>)
//     const adminLink = (
//       <Container>
//           <Header />
//           <AppNavbar />
//           <CMS />
//       </Container>
//     )
//     return (
      
//       <Provider store ={store}>
//         <div className='App'>
//         {isAuthenticated? userLink : adminLink}
//         </div>
//       </Provider>
      
//     )
//   }
// }


// const mapStateToProps = (state) =>({
//     isAuthenticated : state.auth.isAuthenticated
// })
// // connect(mapStateToProps,null)(App)
// export default App
