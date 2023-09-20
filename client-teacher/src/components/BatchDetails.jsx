import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function BatchDetails() {
  const { batchId } = useParams();
  const [materialTitle, setMaterialTitle] = useState("");
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch course materials for the selected batch
    axios
      .get(`http://localhost:3000/teacher/batch/${batchId}/materials`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourseMaterials(response.data.courseMaterials);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course materials:", error);
        setIsLoading(false);
      });
  }, [batchId]);

  const handleMaterialUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setSnackbarMessage("No file uploaded.");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", materialTitle);
    formData.append("file", file);

    axios
      .post(
        `http://localhost:3000/teacher/batch/${batchId}/materials`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Material uploaded successfully");
        setMaterialTitle("");
        setFile(null);
        setSnackbarMessage("Material uploaded successfully");
        setOpenSnackbar(true);
        // Refresh the course materials list
        axios
          .get(`http://localhost:3000/teacher/batch/${batchId}/materials`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            setCourseMaterials(response.data.courseMaterials);
          })
          .catch((error) => {
            console.error("Error fetching course materials:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading material:", error);
        setSnackbarMessage("Error uploading material");
        setOpenSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleDeleteMaterial = (materialId) => {
    axios
      .delete(
        `http://localhost:3000/teacher/batch/${batchId}/materials/${materialId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Material deleted successfully");
        setSnackbarMessage("Material deleted successfully");
        setOpenSnackbar(true);
        // Refresh the course materials list
        axios
          .get(`http://localhost:3000/teacher/batch/${batchId}/materials`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            setCourseMaterials(response.data.courseMaterials);
          })
          .catch((error) => {
            console.error("Error fetching course materials:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting material:", error);
        setSnackbarMessage("Error deleting material");
        setOpenSnackbar(true);
      });
  };

  return (
    <Box>
      <h2>Batch Details</h2>
      <h3>Upload Course Material</h3>
      <TextField
        label="Material Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={materialTitle}
        onChange={(e) => setMaterialTitle(e.target.value)}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMaterialUpload}
        disabled={!materialTitle || !file}
      >
        Upload Material
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <h3>Course Materials</h3>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {courseMaterials.map((material) => (
            <ListItem key={material._id}>
              <ListItemText
                primary={material.title}
                secondary={material.filename} // Display the file name as secondary text
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteMaterial(material._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default BatchDetails;
