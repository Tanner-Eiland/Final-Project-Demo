const express = require('express');
const router = express();
const statesController = require("../../controller/statesController");

router.route("import").post(statesController.importData);

router.route("/")
.get(statesController.getAllStates)
.post(statesController.createStateInDatabase)
.put(statesController.updateStateInDatabase);

router.route("/:code")
.get(statesController.getState);

module.exports = router;
