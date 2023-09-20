import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function AssignedBatches() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the assigned batches for the logged-in user
    axios
      .get("http://localhost:3000/users/assigned-batches", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBatches(response.data.batches);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assigned batches:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Assigned Batches
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {batches.map((batch) => (
            <Card key={batch._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {batch.name}
                </Typography>
                {/* Link to the batch details page with batchId as a URL parameter */}
                <Link to={`/batch-details/${batch._id}/materials`}>
                  <Button variant="outlined" color="primary">
                    View Batch
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Box>
  );
}

export default AssignedBatches;
