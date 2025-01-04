const MasterSetting = require("../models/MasterSetting");
const DynamicForm = require("../models/dynamicForm");

// Fetch all settings
let masterSettings = {
  fields: [
    { id: 1, name: "firstName", label: "First Name", type: "text", required: true },
    { id: 2, name: "email", label: "Email", type: "email", required: true },
    { id: 3, name: "age", label: "Age", type: "number", required: false },
  ],
};
const getSettings = async (req, res) => {
  try {
    const settings = await MasterSetting.find();
    const formVal = await DynamicForm.findOne();
    if (formVal) {
      const formValues = formVal.value[0];

      const updatedSettings = settings.map((setting) => {
        return {
          ...setting,
          key: setting.key,
          value: setting.value,
          type: setting.type,
          formValue: formValues[setting.key] || null, // Set formValue to null if the key doesn't exist in formVal
        };
      });
      res.send(updatedSettings);
    } else {
      res.send(settings);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

// Save settings to the database (insert, update, or delete)
const updateSetting = async (req, res) => {
  try {
    const { updatedSettings, deletedSettings } = req.body;

    // Delete settings
    await MasterSetting.deleteMany({ key: { $in: deletedSettings } });

    // Update or insert new settings
    const bulkOperations = updatedSettings.map((setting) => ({
      updateOne: {
        filter: { key: setting.key },
        update: { $set: setting },
        upsert: true, // Insert if not found
      },
    }));

    await MasterSetting.bulkWrite(bulkOperations);

    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving settings" });
  }
};

const getForm = async (req, res) => {
  try {
    const settings = await DynamicForm.find();
    res.send(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

const saveForm = async (req, res) => {
  try {
    const settingsVal = await DynamicForm.findOne();
    if (settingsVal) {
      await DynamicForm.updateOne({ _id: settingsVal._id }, { value: req.body });
      const settingsNewVal = await DynamicForm.findOne();
      res.send(settingsNewVal);
    } else {
      const settings = await DynamicForm.create({ value: req.body });
      res.send(settings);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

module.exports = { getSettings, updateSetting, getForm, saveForm };
