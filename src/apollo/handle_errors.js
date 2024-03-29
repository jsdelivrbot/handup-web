export default {
  applyAfterware({ response }, next) {
    if (!response.ok) {
      if (response.status == 401) {
        clearLocalStorageAndReload();
      } else {
        response.clone().text().then(bodyText => {
          console.error(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);

          next();
        });
      }
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          console.error('GraphQL Errors: ', errors);

          if (_.some(errors, { status: 403 })) {
            clearLocalStorageAndReload();
          }
        }

        next();
      });
    }
  }
};

function clearLocalStorageAndReload() {
  localStorage.removeItem('reduxPersist:currentUser');
  window.location.reload();
}
