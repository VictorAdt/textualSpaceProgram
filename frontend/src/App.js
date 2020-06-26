import React, { Component } from 'react';
import {ShipProvider} from './contexts/ShipProvider';
import Nav from './components/common/Nav'

export default class App extends Component {
  
  render() {
    return (
      <div className="app__container">
        <ShipProvider>
            <Nav />
        </ShipProvider>
      </div>
    );
  }
}
