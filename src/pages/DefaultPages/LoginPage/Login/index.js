import React from 'react'
import LoginForm from './LoginForm'
import './style.scss'

class Login extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__block main-login__block--extended pb-0 mt-5">
          <div className="main-login__block__inner mt-5">
            <div className="main-login__block__form">
              <LoginForm email={this.state.restoredEmail} />
            </div>
            <div className="main-login__block__sidebar">
              <img
                style={{ width: 110, height: 29, marginLeft: 55 }}
                src={'resources/images/logo-inverse.png'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
