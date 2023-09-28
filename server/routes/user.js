const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");
const { User, Course, Batch, File } = require("../database/models");
const { getACourse } = require("../database/utils");
const z = require("zod");
const fs = require("fs");
const path = require("path");

const router = express.Router();

let signupProps = z.object({
  username: z.string().min(1).max(50).email(),
  password: z.string().min(8).max(50),
});


router.post("/signup", async (req, res) => {
  const parsedInput = signupProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const name = parsedInput.data.name;
  const phoneNumber = parsedInput.data.phoneNumber;

  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password, name, phoneNumber }); // Include name and phoneNumber
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});


router.get("/me", authenticateJwt, (req, res) => {
  res.json(req.user.username);
});

const userLoginSchema = z.object({
  username: z.string().min(1).max(50).email(),
  password: z.string().min(8).max(50),
});

router.post("/login", async (req, res) => {
  try {

    const userLoginSchema = z.object({
      username: z.string().min(1).max(50).email(),
      password: z.string().min(8).max(50),
    });
    // Validate the input using the userLoginSchema
    const parsedInput = userLoginSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const { username, password } = parsedInput.data;

    // Check if the user exists
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    // Create a token with user's ID in the payload
    const token = jwt.sign(
      {
        id: user._id, // Include the user's ID in the token payload
        username,
        role: 'user',
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


router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  if (courses) {
    res.json({ courses });
  } else {
    res.json({ message: "Empty" });
  }
});

// Define a route to fetch user data along with associated courses and batches
router.get("/", async (req, res) => {
  try {
    // Fetch users along with their associated courses and batches
    const users = await User.find({})
      .populate("purchasedCourses", "title") // Populate the "purchasedCourses" field with "title" only
      .populate("assignedBatches", "name startDate endDate maxStudents")
      .select("username name phoneNumber purchasedCourses assignedBatches");

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await getACourse(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }
  const user = await User.findOne({ username: req.user.username });
  if (user) {
    // check if course is already purchased
    const index = user.purchasedCourses.findIndex(id => id === courseId);
    if (index !== -1) {
      return res.json({ message: 'Course already purchased' })
    }
    user.purchasedCourses.push(course);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(403).json({ message: "User not found" });
  }

});



router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});


router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});


// Route to fetch batch details, including course materials
router.get('/batch-details/:batchId', authenticateJwt, async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const batch = await Batch.findById(batchId).populate('courseMaterials');
    return res.json({ batch });
  } catch (error) {
    console.error('Error fetching batch details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to download course material by ID
router.get('/download/:materialId', authenticateJwt, async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const material = await File.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${material.filename}"`);
    res.setHeader('Content-Type', material.contentType);

    // Send file data as a response
    res.send(material.data);
  } catch (error) {
    console.error('Error downloading material:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this route handler to your user.js file
router.get('/assigned-batches', authenticateJwt, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user by ID to get their assigned batches
    const user = await User.findById(userId).populate('assignedBatches');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const assignedBatches = user.assignedBatches;

    return res.json({ batches: assignedBatches });
  } catch (error) {
    console.error('Error fetching assigned batches:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/batch/:batchId/materials", async (req, res) => {
  try {
    const batchId = req.params.batchId;

    // Query the Batch model to find the batch and populate the course materials
    const batch = await Batch.findById(batchId).populate("courseMaterials");

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    return res.json({ courseMaterials: batch.courseMaterials });
  } catch (error) {
    console.error("Error fetching course materials:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users/batch/:batchId/download/:materialId", (req, res) => {
  try {
    const batchId = req.params.batchId;
    const materialId = req.params.materialId;

    // Implement logic to fetch the material from the database using materialId
    // For example, you can use Mongoose to find the material by ID

    // In this example, we'll assume that you have the file path and content type
    // of the material in your database
    const filePath = "/path/to/material/file.pdf"; // Replace with your file path
    const contentType = "application/pdf"; // Replace with the correct content type

    // Set the response headers for file download
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename=material.pdf`);

    // Create a read stream from the file path and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading material:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
