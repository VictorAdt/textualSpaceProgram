import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from './../../contexts/UserContext'
import Alert from 'react-bootstrap/Alert'
import RandomCelestBody from './../backgrounds/RandomCelestBody'
import Col from 'react-bootstrap/Col'

class SignUp extends Component {
	state = {
		username: '',
		password: '',
		errorMsg: null,
	}

	handleChange = (e) => {
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
				this.context.setUser(userCreationRes.data)
				localStorage.setItem('user', JSON.stringify(userCreationRes.data))
				window.location.pathname = '/';
			}
		} catch (error) {
			this.setState({ errorMsg: 'wrong username or username already taken' })
		}
	}

	render() {
		const { username, password, errorMsg } = this.state;
		return (
			<div className="form__ctnr login__ctnr">
				<Col xs={12} md={6} className="SignUp form">
					<Alert className={errorMsg ? '' : 'disNone'} variant="warning"  > {this.state.errorMsg}</Alert>
					<h2>Signup</h2>
					<Link to="/login" className="switch__login__signup"> Whant to login instead? </Link>
					<form className="login__form" onSubmit={this.handleSubmit} >
						<input className="input__form" placeholder="Username" onChange={this.handleChange} type="text" id="username" name="username" value={username} required="" />
						<input className="input__form" placeholder="Password" onChange={this.handleChange} type="password" id="password" name="password" value={password} required="" />
						<div className="container__button">
							<button type="submit" className="button form__button">Signup</button>
						</div>
					</form>
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