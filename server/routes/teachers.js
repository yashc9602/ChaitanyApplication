const express = require("express");
const router = express.Router();
const { Teacher } = require("../database/models"); // Import the Teacher model

// Define a GET route for /admin/teachers to fetch teacher names
router.get("/", async (req, res) => {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find({}, "_id name"); // Retrieve only the 'name' field

    // Extract teacher names from the retrieved data


    // Send the list of teacher names as a JSON response
    res.json({ teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
