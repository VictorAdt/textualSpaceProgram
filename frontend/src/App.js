import React, { Component } from 'react';
import { ShipProvider } from './contexts/ShipProvider';
import Container from './../node_modules/react-bootstrap/Container'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import './Breakpoints.scss';
import './Keyframes.scss';
import './Font.scss';
import { UserProvider } from './contexts/UserContext';
import BackgroundHUD from './components/backgrounds/BackgroundHUD';
import Routes from './routes/Routes'
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/nav/Nav';
import axios from 'axios';


class App extends Component {
  state = {
    celestBodies: null,
  }

  async componentDidMount() {
    try {
      const celestBodiesRes = await axios({
        method: 'GET',
        url: `/celest-bodies`
      })
      const fetchedCelestBodies = celestBodiesRes.data
      this.setState({celestBodies: fetchedCelestBodies})
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const {celestBodies} = this.state
    return (
      <Container fluid className="app__container">
        <UserProvider>
          <ShipProvider>
            <BrowserRouter>
              <Nav />
              <Routes 
                celestBodies={celestBodies}
              />
            </BrowserRouter>
            <BackgroundHUD />
          </ShipProvider>
        </UserProvider>
      </Container>
    );
  }
}

export default App;

