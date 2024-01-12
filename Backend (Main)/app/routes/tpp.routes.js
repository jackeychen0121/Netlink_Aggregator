const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/tpp.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/signout", controller.signout);

  // app.get("/api/profile", [authJwt.verifyToken], controller.getProfile);
  // app.put("/api/profile", [authJwt.verifyToken], controller.modifyProfile);
  // app.put("/api/forgotPassword", controller.forgotPassword);
  // app.put("/api/resetPassword", controller.resetPassword);

  app.get("/api/tpp/token_generate", [authJwt.verifyToken], controller.token_generate);
};
