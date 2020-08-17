import React, { Component } from 'react';
import {UserContext} from './../contexts/UserContext'

export default class NoMatch extends Component {

    componentDidMount(){
        window.location.pathname = '/' ;
    }

    render() {
        return (
            null
        );
    }
}

NoMatch.contextType = UserContext;
