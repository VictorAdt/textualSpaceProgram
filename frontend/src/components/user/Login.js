import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import UserContext from './../contexts/UserContext'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  
  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async  (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const data = {
      email,
      password,
      username: email,
      identifier: email
    }

    try {
      const userCreationRes = await axios({
        method: 'POST',
        url: '/login',
        data
      })
      //SUCCESS
      if (userCreationRes.status === 200) {
        alert('You logged in')
        this.context.setUser(userCreationRes.data)
        console.log(userCreationRes.data)
        window.location.pathname = '/' ;
      }
      } catch(error){
          if(error.response.status === 400){
              alert('Wrong email or password')
          }
      }
  }

  render() {
    const { email, password } = this.state;
    return (
      <UserContext.Consumer>
        {({ user, setUser }) => (
          <div className="Login">
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit} >
              <div>
                <label> Email </label>
                <input onChange={this.handleChange} type="email" id="email" name="email" value={email} />
              </div>
              <div>
                <label> password </label>
                <input onChange={this.handleChange} type="password" id="password" name="password" value={password} />
              </div>
              <button type="submit">login</button>
            </form>
            <Link to="/Signup">Whant to sign up instead?</Link>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

Login.contextType = UserContext;

export default Login;