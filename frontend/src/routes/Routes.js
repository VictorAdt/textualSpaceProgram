import React from 'react';
import {Switch, Route} from "react-router-dom";
import Builder from './../pages/Builder'
import Home from './../pages/Home'
import ShipControl from '../components/controls/ShipControl'
import Observatory from './../pages/Observatory'
import Profile from './../pages/Profile'
import ResearchFacility from './../pages/ResearchFacility'
import TrackingStation from './../pages/TrackingStation'

const Routes = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/builder"} component={Builder} />
            <Route exact path={"/shipcontrol"} component={ShipControl} /> 
            <Route exact path={"/observatory"} component={Observatory} />
            <Route exact path={"/profile"} component={Profile} /> 
            <Route exact path={"/researchfacility"} component={ResearchFacility} /> 
            <Route exact path={"/trackingstation"} component={TrackingStation} /> 
        </Switch>
    );
};

export default Routes;

