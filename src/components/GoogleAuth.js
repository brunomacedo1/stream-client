import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import axios from 'axios';

class GoogleAuth extends Component {
  componentDidMount() {
    //Requisição para api do google iniciar o fluxo  Oauth.
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '662078152102-6fao17f7atdjjh8qo0to48j2guqldmjo.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if ( this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button className="ui red google button" onClick={this.onSignOutClick}>
            <i className="google icon"/>
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon"/>
            Sign In with Google
          </button>
        </div>
      );
    };
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  };
};

const mapStatetoProps = (state) => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId
  };
}

export default connect(
  mapStatetoProps, 
  {signIn, signOut})(GoogleAuth);