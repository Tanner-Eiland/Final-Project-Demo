const express = require('express');
const router = express();
const statesController = require("../../controller/statesController");

router.route("/")
.get(statesController.getAllStates)
.post(statesController.createStateInDatabase)
.put(statesController.updateStateInDatabase);

router.route("/:state").get(statesController.getState);

module.exports = router;
