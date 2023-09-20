// Import necessary modules and models
const express = require("express");
const router = express.Router();
const { Batch } = require("../database/models"); // Import the Batch model

// Define a route for handling GET requests to "/admin/batches/"
router.get("/", async (req, res) => {
  try {
    // Retrieve batches from the database (customize this query as needed)
    const batches = await Batch.find();

    // Send the batches as a JSON response
    res.json({ batches });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add more routes for batch-related operations as needed

module.exports = router;
