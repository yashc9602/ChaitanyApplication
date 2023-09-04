const mongoose = require("mongoose");

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  name: String, // Added "name" field
  phoneNumber: String, // Added "phone number" field
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
});

const teacherSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String, // Added "name" field
  phoneNumber: String, // Added "phone number" field
  assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String, // Added "name" field
  phoneNumber: String, // Added "phone number" field
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  category: {
    type: String,
    enum: ['language', 'skill', 'lifestyle'],
  },
});

const batchSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  maxStudents: Number,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Batch = mongoose.model("Batch", batchSchema);

module.exports = { User, Teacher, Admin, Course, Batch };
