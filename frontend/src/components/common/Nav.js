import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Routes from '../../routes/Routes'

const Nav = () => {
  return (
      <BrowserRouter>
        <nav>
          <Link to="/"> Tracking Station </Link>
          <Link to="/builder"> Builder </Link>
        </nav>
        <Routes />
      </BrowserRouter>
  );
};

export default Nav;