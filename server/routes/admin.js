const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");
const { Admin, Course, Teacher } = require("../database/models");
const z = require("zod");

const router = express.Router();

let signupProps = z.object({
  username: z.string().min(1).max(50).email(),
  password: z.string().min(8).max(50),
  name: z.string().min(1).max(50), // Add name validation
  phoneNumber: z.string().min(10).max(15), // Add phone number validation
});

router.post("/signup", async (req, res) => {
  const parsedInput = signupProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }

  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const name = req.body.name; // Add this line to extract the name from the request body
  const phoneNumber = req.body.phoneNumber; // Add this line to extract the phoneNumber from the request body

  const user = await Admin.findOne({ username });
  if (user) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newUser = new Admin({ username, password, name, phoneNumber }); // Include the name and phoneNumber
    await newUser.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});


router.get("/me", authenticateJwt, (req, res) => {
  res.json(req.user.username);
});

router.post("/login", async (req, res) => {
  const parsedInput = signupProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.delete("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course deleted successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.post("/batches", authenticateJwt, async (req, res) => {
  try {
    const { courseId, teacherId, batchName, startDate, endDate, maxStudents } = req.body;

    // Check if the provided courseId and teacherId exist in the database
    const course = await Course.findById(courseId);
    const teacher = await Teacher.findById(teacherId);

    if (!course || !teacher) {
      return res.status(404).json({ message: "Course or teacher not found" });
    }

    // Create a new batch
    const batch = new Batch({
      name: batchName,
      startDate,
      endDate,
      maxStudents,
      courseId,
      teacherId,
    });

    // Save the batch to the database
    await batch.save();

    res.json({ message: "Batch created successfully", batchId: batch.id });
  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
