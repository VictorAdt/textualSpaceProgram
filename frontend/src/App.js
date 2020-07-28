import React, { Component } from 'react';
import {ShipProvider} from './contexts/ShipProvider';
import Nav from './components/common/Nav'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from './../node_modules/react-bootstrap/Container'
import './App.scss'

export default class App extends Component {
  
  render() {
    return (
      <Container fluid className="app__container">
        <ShipProvider>
            <Nav />
        </ShipProvider>
      </Container>
    );
  }
}
