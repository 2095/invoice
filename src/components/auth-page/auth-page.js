import React from 'react';
import './auth-page.css';
import {connect} from 'react-redux';
import {setLogin, setPassword, setAvatarURL, changeUserIsAuthorized} from '../../redux/actions';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
      login: state.login,
      password: state.password,
      avatarUrl: state.avatarUrl,
      userIsAuthorized: state.userIsAuthorized
    }};
  
const mapDispatchToProps = (dispatch) => {
  return {
      setLogin: (payload) => dispatch(setLogin(payload)),
      setPassword: (payload) => dispatch(setPassword(payload)),
      setAvatarURL: (payload) => dispatch(setAvatarURL(payload)),
      changeUserIsAuthorized: () => dispatch(changeUserIsAuthorized())
    }
  };


class AuthPage extends React.Component {

  fetchLogin(){

    const login = this.props.login;
    const password = this.props.password;

    

    fetch(`https://api.github.com/users/${login}`)
      .then(response => response.json())
      .then(json => {
        if (json.message){
          alert('User not found')
          console.log(json.message)
        }
        else{
          this.props.setAvatarURL(json.avatar_url)
          this.fetchPasswordCheck(login, password)
        }
        })
  }

  fetchPasswordCheck(login, password){
    fetch('/api/auth/login',
      {method: 'POST', 
      body: JSON.stringify({login, password}),
      headers: {'Content-Type': 'application/json'}}
    )
      .then(response => response.json())
      .then(json => {
        if (json.message){
          alert(json.errors[0].msg)
          console.log(json.errors[0].msg)
        }
        else{
          this.props.changeUserIsAuthorized();
        }
        })
  }

  loginChange = (e) => {
    const login = e.target.value;

    this.props.setLogin(login);
  }

  passwordChange = (e) => {
    const password = e.target.value;

    this.props.setPassword(password);
  }

    render() {

      if(this.props.userIsAuthorized){
        return <Redirect to="/"/>
      }

      return(
        <div className = "login-form"> 
            <input type="text" className="form-control" placeholder="Type login" value={this.props.login}
                onChange={this.loginChange}/>
            <input type="password" className="form-control" placeholder="Type password" value={this.props.password}
                onChange={this.passwordChange}/>
            <button type="submit" className="btn btn-primary btn-block" onClick={()=>this.fetchLogin()}>Sign In</button>
        </div>
      )
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
