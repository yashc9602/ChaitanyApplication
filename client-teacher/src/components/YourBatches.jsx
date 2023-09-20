import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom"; // Updated import
import axios from "axios";

function YourBatches() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the batches assigned to the teacher from the server
    axios
      .get("http://localhost:3000/teacher/batch", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBatches(response.data.batches);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching batches:", error);
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
                <Link to={`/teacher/batch/${batch._id}/details`}>
                  <Button variant="outlined" color="primary">
                    View Batch
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Render the batch details page content */}
      <Outlet />
    </Box>
  );
}

export default YourBatches;
