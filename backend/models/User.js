import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: function () {
      // Generate initials from the name
      if (this.name) {
        const initials = this.name
          .split(" ")
          .map(word => word[0].toUpperCase())
          .join("");
        // Return initials as text (you can display this in frontend)
        return initials;
      }
      return "NA"; // fallback
    },
  },

});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
