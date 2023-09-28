const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const teacherRouter = require("./routes/teacher");
const adminRoutes = require("./routes/admin");
const adminTeachersRouter = require("./routes/teachers");
const batchesRouter = require("./routes/batches"); 
const usersRouter = require("./routes/user");
const File = require("./database/models").File;
const Batch = require("./database/models").Batch;
const multer = require("multer");
const { MongoClient, GridFSBucket } = require("mongodb");
const { authenticateJwt } = require("./middleware/auth");

const stripeClient = require('stripe')('sk_test_51NjNVwSJiOoEgBlUwyKRynlKmyoK0dn5HBxV4GwbnVFg5qUIYdTiD0XVuP5kZljhIZZVvsa3YmYbKosCTfNlCxy100yaBDvQtB')

require("./database/connect");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/payment", paymentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRoutes);
app.use("/admin/teachers", adminTeachersRouter);
app.use("/admin/batches", batchesRouter);
app.use('/batches', batchesRouter);
app.use("/admin/user", usersRouter);


app.get('/batches', async (req, res) => {
    try {
      // Fetch batches from the database using the Batch model
      const batches = await Batch.find();
  
      // Send the batches as a JSON response
      res.json({ batches });
    } catch (error) {
      console.error('Error fetching batches:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.get('/', async (req, res) => {
    const { redirect_status } = req.query;

    try {
        // Retrieve the PaymentIntent using its client secret
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_client_secret);

        // Update the payment status based on the redirect_status query parameter
        if (redirect_status === "succeeded") {
            // Payment succeeded, update your database or perform other actions
            // You can use paymentIntent.payment_status or similar properties to update the status
            return res.json({ message: 'Payment Successful' })
            res.redirect("http://localhost:3000/users/courses");
        } else {
            // Payment failed or other status, handle accordingly
            return res.status(404).json({ message: 'Payment failed' })
        }
    } catch (error) {
        console.error("Error handling payment redirect:", error);
        // Redirect to an error page or handle errors accordingly
        return res.status(500).json({ message: 'Payment failed' })
    }
})

app.get("/admin/users", async (req, res) => {
  try {
    // Fetch users along with their assigned batches and course
    const users = await User.find({})
      .populate({
        path: "assignedBatches",
        select: "name startDate endDate maxStudents", // Adjust to the fields you want to select
      })
      .select("name phoneNumber")
      .exec();

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/teacher/batch/:batchId/materials", upload.single("file"), async (req, res) => {
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

app.get("/teacher/batch/:batchId/materials", authenticateJwt, async (req, res) => {
  try {
    const batchId = req.params.batchId;
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

app.delete("/teacher/batch/:batchId/materials/:materialId", authenticateJwt, async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const materialId = req.params.materialId;

    // Remove the material from the batch's courseMaterials array
    await Batch.findByIdAndUpdate(batchId, {
      $pull: { courseMaterials: materialId },
    });

    // Delete the material document
    await File.findByIdAndDelete(materialId);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error deleting material:", error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
});


// Route to download course material by ID
app.get('/batch-details/download/:materialId', authenticateJwt, async (req, res) => {
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

app.get("/users/batch-details/:batchId/materials", authenticateJwt, async (req, res) => {
  try {
    const batchId = req.params.batchId;
    // Fetch course materials associated with the batch
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

app.delete("/admin/batches/:batchId", async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const deletedBatch = await Batch.findByIdAndRemove(batchId);

    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    return res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting batch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(3000, () => console.log("Server running on port 3000"));
