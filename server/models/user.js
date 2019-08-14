const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt");
const ROLE_MEMBER = require("../constants").ROLE_MEMBER;
const ROLE_CLIENT = require("../constants").ROLE_CLIENT;
const ROLE_OWNER = require("../constants").ROLE_OWNER;
const ROLE_ADMIN = require("../constants").ROLE_ADMIN;

//================================
// User Schema
//================================
const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      firstName: { type: String },
      lastName: { type: String }
    },
    role: {
      type: String,
      enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
      default: ROLE_MEMBER
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  }
);

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre("save", function(next) {
  const user = this,
    SALT_FACTOR = 5;

  if (user.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
