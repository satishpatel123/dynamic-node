const mongoose = require('mongoose');

const MasterSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const MasterSetting = mongoose.model('MasterSetting', MasterSettingSchema);

module.exports = MasterSetting;
