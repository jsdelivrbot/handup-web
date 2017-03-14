import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import ReactGoogleLogin from 'react-google-login';
import { googleClientId } from '../config';
import { SetUserId, SetUserToken } from '../actions';

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
  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  render () {
    if (this.state.loading) {
      return <div>Loading ...</div>
    }

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
    this.props.SetUserId(response.data.loginUserWithAuth0Social.user.id);

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
      .then(() => {
        this.props.history.push(this.props.returnTo || '/');
      })
  }

  onFailure(response) {
    console.log(response);
  }
}

function mapStateToProps({ returnTo }) {
  return { returnTo };
};

export default connect(mapStateToProps, { SetUserId, SetUserToken })(withRouter(GoogleLogin));
