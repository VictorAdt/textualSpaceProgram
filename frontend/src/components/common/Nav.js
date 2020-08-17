import BurgerMenu from './menu/BurgerMenu';
import {UserContext} from './../../contexts/UserContext'
import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    if(this.context.user)
    return (
      <BurgerMenu />
    )
    else {
      return null
    }
  }
}
Nav.contextType = UserContext;
