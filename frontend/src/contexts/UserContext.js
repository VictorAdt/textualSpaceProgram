import React, { Component } from 'react';

export const UserContext = React.createContext()

export class UserProvider extends Component {
    state = {
        user: null,
    }

    componentDidMount(){
      const user = localStorage.getItem('user')
      if(user){
        this.setUser(JSON.parse(user))
      }
    }

    setUser = user => {
      this.setState({user: user})
    }

    render() {
        return (
            <UserContext.Provider value={{ 
                user: this.state.user,
                setUser: user => this.setUser(user)
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}