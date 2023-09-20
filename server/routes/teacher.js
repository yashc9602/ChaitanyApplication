const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");
const { Teacher, Batch, Course, File } = require("../database/models");
const z = require("zod");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const router = express.Router();

// Define schema for teacher signup
const teacherSignupSchema = z.object({
  username: z.string().min(1).max(50).email(),
  password: z.string().min(8).max(50),
});

// Teacher signup route
router.post("/signup", async (req, res) => {
  const parsedInput = teacherSignupSchema.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  const { username, password } = parsedInput.data;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  const user = await Teacher.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "Teacher already exists" });
  } else {
    const newUser = new Teacher({ username, password, name, phoneNumber });
    await newUser.save();
    const token = jwt.sign({ username, role: "teacher" }, SECRET, {
      expiresIn: "1h",
    });
    return res.json({ message: "Teacher created successfully", token });
  }
});

router.get("/me", authenticateJwt, (req, res) => {
  res.json(req.user.username);
});

// Define schema for teacher login

router.post('/login', async (req, res) => {
  try {
    // Validate the input
    const loginSchema = z.object({
      username: z.string().min(1).max(50).email(),
      password: z.string().min(8).max(50),
    });

    const parsedInput = loginSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const { username, password } = parsedInput.data;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ username, password });

    if (!teacher) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    // Create a token with teacher's ID in the payload
    const token = jwt.sign(
      {
        id: teacher._id, // Include the teacher's ID in the token payload
        username,
        role: 'teacher',
      },
      SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new batch route
router.post("/batches", authenticateJwt, async (req, res) => {
  try {
    const { name, courseId, teacherId } = req.body;
    const newBatch = new Batch({ name, courseId, teacherId });
    await newBatch.save();
    return res.status(201).json({ message: "Batch created successfully", batchId: newBatch.id });
  } catch (error) {
    console.error("Error creating batch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// View assigned batches route
router.get("/batch", authenticateJwt, async (req, res) => {
  try {
    const teacherId = req.user.id; // Make sure req.user.id is set correctly by the middleware
    const assignedBatches = await Batch.find({ teacherId });
    return res.json({ batches: assignedBatches });
  } catch (error) {
    console.error("Error fetching assigned batches:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get the courses of the logged-in teacher
router.get("/course", authenticateJwt, async (req, res) => {
  try {
    const teacherId = req.user.id;
    console.log("Teacher id:", teacherId);
    const courses = await Course.find({ teacher: teacherId });
    return res.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Create Multer storage engine
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

// POST endpoint to upload course material
router.post("/:batchId/materials", upload.single("file"), async (req, res) => {
  const batchId = req.params.batchId;
  console.log("Received batchId:", batchId);
  try {
    const { originalname, buffer, mimetype } = req.file;

    // Create a new File document
    const file = new File({
      filename: originalname,
      contentType: mimetype,
      data: buffer,
    });

    // Save the file to the database
    await file.save();

    // Add the uploaded file to the batch's courseMaterials array
    const batchId = req.params.batchId;
    const batch = await Batch.findByIdAndUpdate(
      batchId,
      { $push: { courseMaterials: file._id } },
      { new: true }
    );

    res.json({ success: true, batch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});


module.exports = router;
