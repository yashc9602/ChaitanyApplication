import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  makeStyles,
} from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/GetApp";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "60px", // Adjust the value to match the height of your navigation bar
  },
}));

function CourseMaterials() {
  const { batchId } = useParams();
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    // Fetch course materials for the selected batch
    axios
      .get(`http://localhost:3000/users/batch/${batchId}/materials`)
      .then((response) => {
        setCourseMaterials(response.data.courseMaterials);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course materials:", error);
        setIsLoading(false);
      });
  }, [batchId]);

  return (
    <Box className={classes.content}>
      <h3>Course Materials</h3>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {courseMaterials.map((material) => (
            <ListItem key={material._id}>
              <ListItemText
                primary={material.title} // Display material title
                secondary={material.filename} // Display file name
              />
              {/* Other actions like download */}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default CourseMaterials;
