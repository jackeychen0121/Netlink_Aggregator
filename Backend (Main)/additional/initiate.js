const db = require("./../app/models");
const Account = db.accounts;
const initialData=require("./defaultAdminCredential");
var bcrypt = require("bcryptjs");
require('dotenv').config({ path: '../.env' });

const initial=async ()=>{

    await db.mongoose
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
  
  const admin=await Account.find({role:"admin"});
  if(admin){
      await Account.deleteMany({role:"admin"});
  }
  await Account.create({
      name:initialData.name,
      email:initialData.email,
      password:bcrypt.hashSync(initialData.password, 8),
      allowed:true,
      role:"admin",
      access_token:""
  });
  console.log("Initilizing done!");
}
initial()