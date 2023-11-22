const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email.."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter an valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password.."],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.post("save", function (doc, next) {
  console.log(`${doc._id} , new user has been created...`);
  next();
});

// fire a function before a doc saved to db
userSchema.pre("save", async function (next) {
  //hashing the password.......
  const salt = await bcrypt.genSalt();
  console.log("user about to be created", this);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method  to login user

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw new Error("Incorrect password");
    }
    throw new Error("User not found");
  } catch (err) {
    throw new Error(`Login failed: ${err.message}`);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
