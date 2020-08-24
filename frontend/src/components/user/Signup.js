import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from './../../contexts/UserContext'
import Alert from 'react-bootstrap/Alert'
import RandomCelestBody from './../animation/RandomCelestBody'
import Col from 'react-bootstrap/Col'

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: null,
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
        url: '/auth/local/register',
        data
      })

      //SUCCESS
      if (userCreationRes.status === 200) {
        alert('account created')
        this.context.setUser(userCreationRes.data)
        localStorage.setItem('user', JSON.stringify(userCreationRes.data))
        console.log(userCreationRes.data)
        window.location.pathname = '/';
      }
    } catch (error) {
      this.setState({ errorMsg: 'No space in username' })
    }
  }

  render() {
    const { username, password, errorMsg } = this.state;
    return (
      <div className="form__ctnr login__ctnr">
        <Col xs={4}  className="SignUp form">
          <Alert className={errorMsg ? '' : 'disNone'} variant="warning"  > {this.state.errorMsg}</Alert>
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label> Username </label>
              <input onChange={this.handleChange} type="text" id="username" name="username" value={username} />
            </div>
            <div>
              <label> Password </label>
              <input onChange={this.handleChange} type="password" id="password" name="password" value={password} />
            </div>
            <button type="submit">Signup</button>
          </form>
          <Link to="/login">
            Whant to login instead?
        </Link>
        </Col>
        {this.props.celestBodies &&
          <RandomCelestBody
            celest_body={this.props.celestBodies}
          />
        }
      </div>
    );
  }
}

SignUp.contextType = UserContext;

export default SignUp;