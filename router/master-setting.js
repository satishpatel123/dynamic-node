const express = require("express");
const {
  getSettings,
  updateSetting,
  getForm,
  saveForm,
} = require("../controller/masterSettingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/", updateSetting);
router.get("/get-form", getForm);
router.post("/save-form", saveForm);

module.exports = router;
