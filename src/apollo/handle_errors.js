export default {
  applyAfterware({ response }, next) {
    if (!response.ok) {
      response.clone().text().then(bodyText => {
        console.error(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);

        next();
      });
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          console.error('GraphQL Errors: ', errors);

          if (_.some(errors, { status: 403 })) {
            localStorage.removeItem('reduxPersist:userToken');
            localStorage.removeItem('reduxPersist:userId');
            window.location.reload();
          }
        }

        next();
      });
    }
  }
};
