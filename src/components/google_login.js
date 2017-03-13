import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import ReactGoogleLogin from 'react-google-login';
import { googleClientId } from '../config';
import { SetUserToken } from '../actions';

function GoogleLogin({ mutate, SetUserToken }) {
  return (
    <ReactGoogleLogin
      clientId={googleClientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  )

  function onSuccess(response) {
    mutate({
      variables: {
        input: {
          access_token: response.tokenObj.access_token,
          connection: 'google_oauth2'
        }
      }
    })
    .then((response) => {
      SetUserToken(response.data.loginUserWithAuth0Social.token);
    });
  }

  function onFailure(response) {
    console.log(response);
  }
}

const login = gql`
  mutation Login($input: LoginUserWithAuth0SocialInput!) {
    loginUserWithAuth0Social(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

const GoogleLoginWithData = graphql(login)(GoogleLogin);

export default connect(null, { SetUserToken })(GoogleLoginWithData);
