import React,{ useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

function UserRow({ user }) {
  const [selectedBatch, setSelectedBatch] = React.useState("");
  const [availableBatches, setAvailableBatches] = React.useState([]);

  const handleAssignBatch = () => {
    // Send a POST request to assign the selected batch to the user
    axios
      .post(`http://localhost:3000/admin/users/${user._id}/assign-batch`, {
        batchId: selectedBatch,
      })
      .then((response) => {
        // Handle success, you can show a success message here
        console.log(response.data.message);
      })
      .catch((error) => {
        // Handle error, you can show an error message here
        console.error("Error assigning batch:", error);
      });
  };

  useEffect(() => {
    // Fetch available batches when the component mounts
    axios.get("http://localhost:3000/admin/batches").then((response) => {
      setAvailableBatches(response.data.batches);
    });
  }, []);

  return (
    <Card sx={{ minWidth: 275, marginBottom: 16 , marginTop: 12 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography color="textSecondary">
          Phone Number: {user.phoneNumber}
        </Typography>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Select Batch</InputLabel>
          <Select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {availableBatches.map((batch) => (
              <MenuItem key={batch._id} value={batch._id}>
                {batch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleAssignBatch}
        >
          Assign Batch
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserRow;
