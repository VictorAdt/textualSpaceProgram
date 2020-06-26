import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import Routes from '../../routes/Routes'

const Nav = () => {
  return (
    <div className="nav__container">
      <BrowserRouter>
        <Link to="/builder"> Builder </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/trackingstation"> Tracking Station </Link>
        <Link to="/researchfacility"> Research Facility </Link>
        <Link to="/observatory"> Observatory </Link>
        <Link to="/"> Home </Link>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default Nav;