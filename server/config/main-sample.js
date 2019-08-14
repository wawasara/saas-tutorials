module.exports = {
  // Secret key for JWT signing and encryption
  secret: "eogksalsrnrdl jarangdlqslek",
  //   // Database connection information for local MongoDB
  //   database: "mongodb://localhost:27017/saas-tutorial",
  //Database connection information for mLab (MongoDB Atlas)
  // change to your <username>:<password> and <database>
  // for example) database: "mongodb+srv://admin:adminpwd@cluster0-x328.mongodb.net/test"
  database:
    "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>",
  //Database connection information for mLab (MongoDB Atlas)
  //database: process.env.MONGODB || "mongodb://localhost:27017/saas-tutorial",
  // Setting port for server
  port: process.env.PORT || 3000
};
