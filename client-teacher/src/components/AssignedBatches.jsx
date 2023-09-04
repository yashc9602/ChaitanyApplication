import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

function AssignedBatches() {
  // You can fetch the assigned batches data from your API or state management here
  const [assignedBatches, setAssignedBatches] = useState([]);

  useEffect(() => {
    // Simulated data for illustration; replace with actual data fetching logic
    const mockAssignedBatches = [
      {
        id: "batch1",
        name: "Mathematics 101",
        course: "Mathematics",
        startDate: "2023-09-01",
        endDate: "2023-12-01",
        studentsCount: 20,
      },
      {
        id: "batch2",
        name: "Physics 202",
        course: "Physics",
        startDate: "2023-09-15",
        endDate: "2023-11-30",
        studentsCount: 15,
      },
      // Add more assigned batches as needed
    ];

    setAssignedBatches(mockAssignedBatches);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Assigned Batches
      </Typography>
      <Paper elevation={3}>
        <List>
          {assignedBatches.map((batch) => (
            <ListItem key={batch.id}>
              <ListItemText
                primary={batch.name}
                secondary={`Course: ${batch.course} | Start Date: ${batch.startDate} | End Date: ${batch.endDate} | Students: ${batch.studentsCount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default AssignedBatches;
