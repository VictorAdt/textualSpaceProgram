import React, { Component } from 'react';
import { ShipProvider } from './contexts/ShipProvider';
import Nav from './components/common/Nav'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from './../node_modules/react-bootstrap/Container'
import './App.scss'
import UserContext from './contexts/UserContext';
import BackgroundHUD from './components/animation/BackgroundHUD';
import BurgerMenu from './components/common/menu/BurgerMenu'
import Routes from './routes/Routes'
import { BrowserRouter } from 'react-router-dom';




export default class App extends Component {
  setUser = user => {
    this.setState({ user });
  };

  state = {
    user: null,
    setUser: this.setUser
  };


  async componentDidMount() {
    /* const userRes = await axios({
      method: 'GET',
      url: '/checkifloggedin'
    });
    const fetchedUser = userRes.data;
    this.setState({ user: fetchedUser })
    console.log('user', fetchedUser) */
  }

  render() {
    const { user } = this.state
    return (
      <Container fluid className="app__container">
        <UserContext.Provider>
          <ShipProvider>
            <BrowserRouter>
              <BurgerMenu />
              <Routes />
            </BrowserRouter>
            <BackgroundHUD />
          </ShipProvider>
        </UserContext.Provider>
      </Container>
    );
  }
}
