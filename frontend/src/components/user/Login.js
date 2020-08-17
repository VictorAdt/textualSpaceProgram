import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from './../../contexts/UserContext'
import RandomCelestBody from './../animation/RandomCelestBody'


class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    if (this.context.user) {
      window.location.pathname = '/'
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    const data = {
      email: username + '@spacecenter.com',
      password,
      username: username,
      identifier: username + '@spacecenter.com'
    }

    try {
      const userCreationRes = await axios({
        method: 'POST',
        url: '/auth/local',
        data
      })


      //SUCCESS
      if (userCreationRes.status === 200) {
        alert('You logged in')
        this.context.setUser(userCreationRes.data)
        localStorage.setItem('user', JSON.stringify(userCreationRes.data))
        console.log(userCreationRes.data)
        window.location.pathname = '/'
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert('Wrong name or password')
      }
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div className="Login">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit} >
            <div>
              <label> Email </label>
              <input onChange={this.handleChange} type="text" id="username" name="username" value={username} />
            </div>
            <div>
              <label> password </label>
              <input onChange={this.handleChange} type="password" id="password" name="password" value={password} />
            </div>
            <button type="submit">login</button>
          </form>
          <Link to="/Signup">Whant to sign up instead?</Link>
        </div>
        {this.props.celestBodies &&
          <RandomCelestBody
            celest_body={this.props.celestBodies}
          />
        }
      </div>

    )
  }
}

Login.contextType = UserContext;

export default Login;