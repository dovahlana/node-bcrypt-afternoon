import React, { Component } from 'react';
import axios from 'axios';
import './Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isAdmin: false,
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }

  toggleAdmin() {
    const { isAdmin } = this.state;
    this.setState({ isAdmin: !isAdmin });
  }

  login() {
    // axios POST to /auth/login here
    let { username, password } = this.state;
    let body = {
      username,
      password
    }
    axios
    .post('/auth/login', body)
    .then( user => {
      this.props.updateUser(user.data)
      this.setState({
        username: '',
        password: ''
      })
    } )
    .catch( err => {
      alert(err.response.request.response);
      this.setState({
        username: '',
        password: ''
      })
    } );
  }

  register() {
    // axios POST to /auth/register here
    let { isAdmin, username, password } = this.state;
    let body = {
      isAdmin,
      username,
      password
    }
    axios
    .post('/auth/register', body)
    .then( user => 
      {
        this.props.updateUser(user.data);
        this.setState(
          {
            username: '', 
            password: ''
          }
        )
        
      }
    )
    .catch( err => {
      this.setState({
        username: '',
        password: ''
      });
      alert(err.response.request.response);
    });
  }

  logout() {
    // axios GET to /auth/logout here
    axios
    .get('/auth/logout')
    .then( user => this.props.updateUser(user) )
    .catch( err => console.log(err) );
  }

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    return (
      <div className="Header">
        <div className="title">Dragon's Lair</div>
        {user.username ? (
          <div className="welcomeMessage">
            <h4>{user.username}, welcome to the dragon's lair</h4>
            <button type="submit" onClick={this.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="loginContainer">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => this.handleUsernameInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => this.handlePasswordInput(e.target.value)}
            />
            <div className="adminCheck">
              <input type="checkbox" id="adminCheckbox" onChange={() => this.toggleAdmin()} /> <span> Admin </span>
            </div>
            <button onClick={this.login}>Log In</button>
            <button onClick={this.register} id="reg">
              Register
            </button>
          </div>
        )}
      </div>
    );
  }
}