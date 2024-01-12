const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
  db.mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Sucessfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);
require("./app/routes/tpp.routes")(app);
require("./app/routes/admin.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
