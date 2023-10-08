import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";

function CourseMaterials() {
  const { batchId } = useParams();
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDownloadMaterial = (materialId, filename) => {
    axios
      .get(
        `http://localhost:3000/users/batch/${batchId}/materials/${materialId}/download`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "material";
        a.click();
  
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading material:", error);
      });
  };
  

  return (
    <Box
      style={{ marginTop: "100px", marginLeft: "20px", marginRight: "20px" }}
    >
      <h2>Course Materials</h2>
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
              <Button
                variant="outlined"
                onClick={() =>
                  handleDownloadMaterial(material._id, material.filename)
                }
              >
                Download
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default CourseMaterials;
