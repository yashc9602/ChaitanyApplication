import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
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
    <Box style={{margin: "10em"}}>
      <Typography variant="h4" gutterBottom >
        Your Assigned Batches
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {batches.map((batch) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={batch._id}>
              <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {batch.name}
                  </Typography>
                  {/* Link to the batch details page with batchId as a URL parameter */}
                  <Link to={`/batch-details/${batch._id}/materials`} key={batch._id}>
                    <Button variant="outlined" color="primary">
                      View Batch
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AssignedBatches;
