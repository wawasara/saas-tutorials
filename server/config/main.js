require("dotenv").config();

module.exports = {
  // Secret key for JWT signing and encryption
  secret: "eogksalsrnrdl jarangdlqslek",
  //   // Database connection information for local MongoDB
  //   database: "mongodb://localhost:27017/saas-tutorial",
  //Database connection information for mLab (MongoDB Atlas)
  database: process.env.MONGODB || "mongodb://localhost:27017/saas-tutorial",
  // Setting port for server
  port: process.env.PORT || 3000
};
