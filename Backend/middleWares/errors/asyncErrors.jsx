/* eslint-disable import/no-anonymous-default-export */
export default (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
