import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ReactGoogleLogin from 'react-google-login';
import { googleClientId } from '../config';
import { SetCurrentUserId, SetCurrentUserToken } from '../actions';

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  render () {
    return (
      <ReactGoogleLogin
        className="btn btn-xl btn-primary full-width"
        clientId={googleClientId}
        onSuccess={this.onSuccess.bind(this)}
        onFailure={this.onFailure.bind(this)}
        disabled={this.state.loading}
      >
        Login with <i className="fa fa-google" /> to participate!
      </ReactGoogleLogin>
    )
  }

  onSuccess(response) {
    this.setState({ loading: true });

    const userData = {
      name: response.profileObj.name,
      avatarImageUrl: response.profileObj.imageUrl
    }

    this
      .props
      .loginMutation({
        variables: {
          input: {
            access_token: response.tokenObj.access_token,
            connection: 'google_oauth2'
          }
        }
      })
      .then((response) => this.handleLoginResponse(response, userData));
  }

  handleLoginResponse(response, userData) {
    this.props.SetCurrentUserId(response.data.loginUserWithAuth0Social.user.id);
    // Force instant local storage set
    localStorage.setItem('reduxPersist:currentUserToken', `"${response.data.loginUserWithAuth0Social.token}"`);
    this.props.SetCurrentUserToken(response.data.loginUserWithAuth0Social.token)

    const input = _.merge(userData, { id: response.data.loginUserWithAuth0Social.user.id });
    this
      .props
      .updateUserMutation({
        variables: { input }
      });
  }

  onFailure(response) {
    console.log(response);
  }
}

const loginMutation = gql`
  mutation login($input: LoginUserWithAuth0SocialInput!) {
    loginUserWithAuth0Social(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`

const updateUserMutation = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        id
      }
    }
  }
`

const LoginButtonWithData = compose(
  graphql(loginMutation, { name: 'loginMutation' }),
  graphql(updateUserMutation, { name: 'updateUserMutation' })
)(LoginButton);

export default connect(null, { SetCurrentUserId, SetCurrentUserToken })(withRouter(LoginButtonWithData));
