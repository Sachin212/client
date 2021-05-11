import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import AuthRoute from './utils/AuthRoute'
import './App.css';
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {AuthProvider} from './context/auth'
import SinglePost from './pages/SinglePost'
import Profile from './pages/Profile'
import EditProfile from './components/EditProfile'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/profile/:username' component={Profile} /> 
          <Route exact path='/editprofile/:username' component={EditProfile} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
