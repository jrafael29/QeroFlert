const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.JWT_SECRET_KEY || "jrafaeldev";

const {
  errorResponse,
  successResponse,
} = require("../helpers/responseRequest.helper");

exports.verifyToken = async (request, response, next) => {
  const token = request.headers["authorization"];

  if (!token) return errorResponse(response, "Token não fornecido.", 401);

  const resultVerify = jwt.verify(token, SECRETKEY, (error, decoded) => {
    if (error) return errorResponse(response, error.message, 500);

    request.user = {
      id: decoded.id,
    };
    return next();
  });
};
