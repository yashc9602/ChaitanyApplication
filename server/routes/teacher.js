const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");
const { Teacher, Batch, Material } = require("../database/models");
const z = require("zod");

const router = express.Router();

// Define schema for teacher signup
let teacherSignupSchema = z.object({
  username: z.string().min(1).max(50).email(),
  password: z.string().min(8).max(50),
  name: z.string().min(1).max(50), // Add name validation
  phoneNumber: z.string().min(10).max(15), // Add phone number validation
});

// Teacher signup route
router.post("/signup", async (req, res) => {
  const parsedInput = teacherSignupSchema.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  const user = await Teacher.findOne({ username });
  if (user) {
    res.status(403).json({ message: "Teacher already exists" });
  } else {
    const newUser = new Teacher({ username, password, name, phoneNumber });
    await newUser.save();
    const token = jwt.sign({ username, role: "teacher" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Teacher created successfully", token });
  }
});


router.get("/me", authenticateJwt, (req, res) => {
  res.json(req.user.username);
});

// Define schema for teacher login



router.post("/login", async (req, res) => {
  const parsedInput = teacherSignupSchema.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const teacher = await Teacher.findOne({ username, password });
  if (teacher) {
    const token = jwt.sign({ username, role: "teacher" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// Create a new batch route
router.post("/batches", authenticateJwt, async (req, res) => {
  try {
    const { name, courseId } = req.body;

    // Create a new batch (adjust the Batch model and save data as needed)
    const newBatch = new Batch({ name, courseId });

    await newBatch.save();

    res.status(201).json({ message: "Batch created successfully", batchId: newBatch.id });
  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// View assigned batches route
router.get("/batches", authenticateJwt, async (req, res) => {
  try {
    // Retrieve assigned batches for the authenticated teacher (customize this query as needed)
    const assignedBatches = await Batch.find({ teacherId: req.user.id });

    res.json({ batches: assignedBatches });
  } catch (error) {
    console.error("Error fetching assigned batches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Upload course materials route
router.post("/materials", authenticateJwt, async (req, res) => {
  try {
    const { batchId, title } = req.body;

    // Implement file upload logic here (e.g., using multer)
    // Save the file to a specific location and store the file path in the Material model

    // Create a new material entry (customize the Material model as needed)
    const newMaterial = new Material({ batchId, title, filePath: /* Store the file path here */ "" });

    await newMaterial.save();

    res.status(201).json({ message: "Material uploaded successfully", materialId: newMaterial.id });
  } catch (error) {
    console.error("Error uploading material:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// View batch details route
router.get("/batches/:batchId", authenticateJwt, async (req, res) => {
  try {
    const batchId = req.params.batchId;

    // Retrieve batch details (customize this query as needed)
    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Ensure that the teacher has access to this batch (check teacherId against req.user.id)

    res.json({ batch });
  } catch (error) {
    console.error("Error fetching batch details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
