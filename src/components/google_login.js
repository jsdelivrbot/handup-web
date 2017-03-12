import React from 'react';
import { gql, graphql } from 'react-apollo';
import ReactGoogleLogin from 'react-google-login';
import { googleClientId } from '../config';

function GoogleLogin({ mutate }) {
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
      localStorage.setItem('token', response.data.loginUserWithAuth0Social.token);
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

export default graphql(login)(GoogleLogin);
