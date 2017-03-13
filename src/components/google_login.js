import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import ReactGoogleLogin from 'react-google-login';
import { googleClientId } from '../config';
import { SetUserToken } from '../actions';

@graphql(gql`
  mutation login($input: LoginUserWithAuth0SocialInput!) {
    loginUserWithAuth0Social(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`, { name: 'loginMutation' })
@graphql(gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        id
      }
    }
  }
`, { name: 'updateUserMutation' })
class GoogleLogin extends Component {
  render () {
    return (
      <ReactGoogleLogin
        clientId={googleClientId}
        buttonText="Login"
        onSuccess={this.onSuccess.bind(this)}
        onFailure={this.onFailure.bind(this)}
      />
    )
  }

  onSuccess(response) {
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
    // Force instant local storage set
    localStorage.setItem('reduxPersist:userToken', `"${response.data.loginUserWithAuth0Social.token}"`);
    this.props.SetUserToken(response.data.loginUserWithAuth0Social.token)

    const updateInput = _.merge(userData, { id: response.data.loginUserWithAuth0Social.user.id });
    this.updateUser(updateInput);
  }

  updateUser(input) {
    this
      .props
      .updateUserMutation({
        variables: { input }
      })
  }

  onFailure(response) {
    console.log(response);
  }
}

export default connect(null, { SetUserToken })(GoogleLogin);
