const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: `e don happenn` });
};

module.exports = errorHandlerMiddleware;
