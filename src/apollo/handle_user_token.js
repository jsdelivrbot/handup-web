export default {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const localCurrentUser = JSON.parse(localStorage.getItem('reduxPersist:currentUser'));
    if (localCurrentUser && localCurrentUser.token) {
      req.options.headers.Authorization = `Bearer ${localCurrentUser.token}`;
    }
    next();
  }
};
