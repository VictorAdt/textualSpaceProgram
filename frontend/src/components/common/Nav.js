import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Routes from '../../routes/Routes'

const Nav = () => {
  return (
    <div className="nav__container">
      <BrowserRouter>
        <Link to="/builder"> Builder </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/"> Tracking Station </Link>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default Nav;