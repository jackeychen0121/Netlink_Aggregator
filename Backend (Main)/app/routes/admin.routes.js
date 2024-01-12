const controller = require("../controllers/admin.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/get_all_tpp", [authJwt.verifyToken, authJwt.isAdmin], controller.get_all_tpp);
  app.post("/api/admin/modify_allowance", [authJwt.verifyToken, authJwt.isAdmin], controller.modify_allowance);
};
