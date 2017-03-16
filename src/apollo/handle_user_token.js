export default {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const localTokenValue = localStorage.getItem('reduxPersist:userToken');
    if (localTokenValue) {
      const token = localTokenValue.slice(1, localTokenValue.length - 1);
      req.options.headers.Authorization = `Bearer ${token}`;
    }
    next();
  }
};
