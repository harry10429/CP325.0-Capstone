const mongoose = require("mongoose");

/**
 * Todo Schema

 */
const todoSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, "Todo content is required"],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
