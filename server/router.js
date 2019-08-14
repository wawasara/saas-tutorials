const AuthenticationController = require("./controllers/authentication"),
  UserController = require("./controllers/user"),
  express = require("express"),
  passportService = require("./config/passport"),
  passport = require("passport");

// Constants for role types
const ROLE_MEMBER = require("./constants").ROLE_MEMBER;
const ROLE_CLIENT = require("./constants").ROLE_CLIENT;
const ROLE_OWNER = require("./constants").ROLE_OWNER;
const ROLE_ADMIN = require("./constants").ROLE_ADMIN;

// Middleware to require login/auth
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    userRoutes = express.Router(),
    authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes. /api/auth
  apiRoutes.use("/auth", authRoutes);

  // Registration route. /api/register
  authRoutes.post("/register", AuthenticationController.register);

  // Login route. /api/login
  authRoutes.post("/login", requireLogin, AuthenticationController.login);

  // Password reset request route (generate/send token). /api/forgot-password
  authRoutes.post("/forgot-password", AuthenticationController.forgotPassword);

  // Password reset route (change password using token). /api/reset-password/:token
  authRoutes.post(
    "/reset-password/:token",
    AuthenticationController.verifyToken
  );

  //=========================
  // User Routes
  //=========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use("/user", userRoutes);

  // View user profile route
  userRoutes.get("/:userId", requireAuth, UserController.viewProfile);

  // Test protected route
  apiRoutes.get("/protected", requireAuth, (req, res) => {
    res.send({ content: "The protected test route is functional!" });
  });

  apiRoutes.get(
    "/admins-only",
    requireAuth,
    AuthenticationController.roleAuthorization(ROLE_ADMIN),
    (req, res) => {
      res.send({ content: "Admin dashboard is working." });
    }
  );

  // Set url for API group routes
  app.use("/api", apiRoutes);
};
