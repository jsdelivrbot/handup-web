export default {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const localToken = JSON.parse(localStorage.getItem('reduxPersist:currentUserToken'));
    if (localToken && localToken.value) {
      req.options.headers.Authorization = `Bearer ${localToken.value}`;
    }
    next();
  }
};
