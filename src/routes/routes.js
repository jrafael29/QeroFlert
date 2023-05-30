const route = require("express").Router();
const authRoutes = require("./auth.routes");

const { verifyToken } = require("../middlewares/verifyToken.middleware");

const {
  errorResponse,
  successResponse,
} = require("../helpers/responseRequest.helper");


route.get("/", function (request, response) {
    return successResponse(response, "deu bomeee");
});

route.use(authRoutes);
route.use(verifyToken);



module.exports = route;
