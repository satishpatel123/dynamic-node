const mongoose = require("mongoose");

const DynamicFormSchema = new mongoose.Schema(
  {
    value: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const DynamicForm = mongoose.model("DynamicForm", DynamicFormSchema);

module.exports = DynamicForm;
