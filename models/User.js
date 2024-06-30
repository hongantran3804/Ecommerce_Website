import { Schema, model, models } from "mongoose";

import bcrypt from "bcrypt";
const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist!"], // email need to be unique and if already exist send email to user
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Username is required!"],
  },
  compName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
    
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    required: [true, "Confirmation is required"],
  },
});

// Hashing password before putting to db
//next param show u done and ready to move on the next step
userSchema.pre("save", function (next) {
  const user = this; // "This" is the value that depends on the context where it appears
  if (user.password) {
    if (this.isNew || this.isModified("password")) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) {
              return next(hashError);
            } else {
              user.password = hash;
              next();
            }
          });
        }
      });
      // assault round is how much time it takes to calculate a single bcrypt hash the more time the more it will be for hacker
      // 10 means it takes 2^10 for the calculation. If more it will take more time
    } 
  }
  return next();
});

// Check User model already exist -> reuse else create it
const User = models.User || model("User", userSchema);

export default User;
