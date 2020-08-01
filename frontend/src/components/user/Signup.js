import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
  }
  
  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const data = {
      email,
      password,
      username: email,
      identifier: email
    }
    const userCreationRes = await axios({
      method: 'POST',
      url: '/register',
      data
    })
    if (userCreationRes.status === 200) {
      alert('Signup code status', userCreationRes.status);
      this.context.setUser(userCreationRes.data)
      console.log(userCreationRes.data)
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="SignUp">
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label> Email </label>
            <input onChange={this.handleChange} type="email" id="email" name="email" value={email} />
          </div>
          <div>
            <label> password </label>
            <input onChange={this.handleChange} type="password" id="password" name="password" value={password} />
          </div>
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Whant to login instead?</Link>
      </div>
    );
  }
}
export default SignUp;