const userSchema = {
  name: {
    type: String,
    required: [true, "Please add the user name"],
  },
  email: {
    type: String,
    required: [true, "Please add the user email"],
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },
  phone: {
    type: Number,
  },
  timestamps: true,
};
module.exports = userSchema;
