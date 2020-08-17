import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Builder from './../pages/Builder'
import ShipControl from '../components/controls/ShipControl'
import TrackingStation from './../pages/TrackingStation'
import Login from './../components/user/Login'
import SignUp from './../components/user/Signup'
import { UserContext, UserProvider } from './../contexts/UserContext'
import NoMatch from './../pages/NoMatch'

export default class Routes extends Component {


    render() {
        return (
            <Switch>
                <Route exact path={"/VAB"} component={this.context.user ?
                    () => <Builder
                        celestBodies={this.props.celestBodies}
                    />
                    :
                    () => <SignUp
                        celestBodies={this.props.celestBodies}
                    />} />
                <Route exact path={"/shipcontrol"} component={this.context.user ?
                    ShipControl
                    :
                    () => <SignUp
                        celestBodies={this.props.celestBodies}
                    />} />
                <Route exact path={"/"} component={this.context.user ?
                    () => <TrackingStation
                        celestBodies={this.props.celestBodies}
                    />
                    :
                    () => <SignUp
                        celestBodies={this.props.celestBodies}
                    />} />
                <Route exact path={"/signup"} component={
                    () => <SignUp
                        celestBodies={this.props.celestBodies}
                    />} />
                <Route exact path={"/login"} component={
                    () => <Login
                        celestBodies={this.props.celestBodies}
                    />} />
                <Route component={NoMatch} />
            </Switch>

        );
    }
}

Routes.contextType = UserContext;


