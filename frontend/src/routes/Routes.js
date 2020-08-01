import React from 'react';
import {Switch, Route} from "react-router-dom";
import Builder from './../pages/Builder'
import ShipControl from '../components/controls/ShipControl'
import TrackingStation from './../pages/TrackingStation'

const Routes = () => {
    return (
        <Switch>
            <Route exact path={"/VAB"} component={Builder} />
            <Route exact path={"/shipcontrol"} component={ShipControl} /> 
            <Route exact path={"/"} component={TrackingStation} /> 
        </Switch>
    );
};

export default Routes;

