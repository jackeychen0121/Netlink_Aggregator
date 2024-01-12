const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateAccountnameOrEmail
    ],
    controller.signup
  );

  // app.post("/api/auth/signin", controller.signin);
  // app.post("/api/auth/signout", controller.signout);

  // app.get("/api/profile", [authJwt.verifyToken], controller.getProfile);
  // app.put("/api/profile", [authJwt.verifyToken], controller.modifyProfile);
  // app.put("/api/forgotPassword", controller.forgotPassword);
  // app.put("/api/resetPassword", controller.resetPassword);

  app.post("/api/auth/signin", controller.signin4account);
  app.post("/api/auth/signin4user", controller.signin4user);
  app.post("/api/auth/verify_user", controller.verify_user);
};
