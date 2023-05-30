const route = require("express").Router();
const authRoutes = require("./auth.routes");

const { verifyToken } = require("../middlewares/verifyToken.middleware");
const redisClient = require('../config/redis.config')

const {
  errorResponse,
  successResponse,
} = require("../helpers/responseRequest.helper");

route.get("/", function (request, response) {
  return successResponse(response, "deu bomeee");
});

route.use(authRoutes);
route.use(verifyToken);

// pub = a função que vai publicar alguma coisa em terminado canal
// room = a sala que a galera vai poder mandar mensagem, e receber men agem.
// sub = a galera que vai ficar escutando em terminado canal

route.post("/publish", function (request, response) {
  try{ 
    const data = request.body
    if(data){
      const {channel, message} = data
      redisClient.publish(channel, message)

      return successResponse(response, {channel, message}, 201);
    }
    return errorResponse(response, "Campos inválidos")
   }catch(error){}
  const {channel, message} = request.body

  console.log('o canal é', channel, "e a mensagem é",message)

});

module.exports = route;
