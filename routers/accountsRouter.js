const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to get accounts!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [account] = await db("accounts").where("id", req.params.id);
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: "Failed to get accounts!" });
  }
});

router.post("/", async (req, res) => {
  const accountData = req.body;
  try {
    const account = await db("accounts").insert(accountData);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "Failed to insert account!" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsUpdated = await db("accounts")
      .where("id", id)
      .update(req.body);
    res.status(200).json({ updated: rowsUpdated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update account!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(200).json({ deletedRecords: rowsDeleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to update account!" });
  }
});

module.exports = router;
