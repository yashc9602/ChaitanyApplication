import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function BatchDetails({ batchId }) {
  // You can fetch the batch details data based on the provided batchId
  const [batchDetails, setBatchDetails] = useState(null);

  useEffect(() => {
    // Simulated data for illustration; replace with actual data fetching logic
    const mockBatchDetails = {
      name: "Mathematics 101",
      course: "Mathematics",
      startDate: "2023-09-01",
      endDate: "2023-12-01",
      students: [
        { id: "student1", name: "John Doe" },
        { id: "student2", name: "Alice Johnson" },
        // Add more enrolled students as needed
      ],
    };

    setBatchDetails(mockBatchDetails);
  }, [batchId]);

  if (!batchDetails) {
    // Loading state or error handling logic can be added here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Batch Details: {batchDetails.name}
      </Typography>
      <Paper elevation={3}>
        <List>
          <ListItem>
            <ListItemText primary={`Course: ${batchDetails.course}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Start Date: ${batchDetails.startDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`End Date: ${batchDetails.endDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Enrolled Students:" />
          </ListItem>
          {batchDetails.students.map((student) => (
            <ListItem key={student.id}>
              <ListItemText primary={student.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Edit Batch
      </Button>
      <Button variant="contained" color="secondary" style={{ marginLeft: "10px", marginTop: "20px" }}>
        Delete Batch
      </Button>
    </div>
  );
}

export default BatchDetails;
