const express = require("express");
const { getAllFacts, addOneFact, updateEmojis } = require("./factController");
const router = express.Router();

router.get("/", getAllFacts);
router.post("/", addOneFact);
router.put("/", updateEmojis);

module.exports = router;
