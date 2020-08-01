import React, { Component } from 'react';
import axios from 'axios';
import UserContext from './../contexts/UserContext'

class Logout extends Component {

    logout = async (e) => {
        const logoutRes = await axios({
            method: 'GET',
            url: '/user/logout'
        })

        console.log(logoutRes.status)

        if (logoutRes.status === 200) {
            alert('You logged out')
            this.context.setUser(null)
            window.location.pathname = '/' ;
        }        
    }

    render() {
        return (
            <UserContext.Consumer>
                {({ user, setUser }) => (
                    <button onClick={this.logout}>logout</button>
                )}
            </UserContext.Consumer>
        );
    }
}
Logout.contextType = UserContext;

export default Logout;