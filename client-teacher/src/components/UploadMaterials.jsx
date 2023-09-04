import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function UploadMaterials() {
  const [file, setFile] = useState(null);
  const [materialName, setMaterialName] = useState("");

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle material name input changes
  const handleMaterialNameChange = (e) => {
    setMaterialName(e.target.value);
  };

  // Function to handle material upload
  const handleUpload = () => {
    // You can implement the logic to upload the file and associate it with the batch
    // Example: Use FormData to send the file to your server
    if (file && materialName) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("materialName", materialName);

      // Simulated success message; replace with actual file upload logic
      alert(`Uploaded "${materialName}" successfully.`);
      
      // Clear the form after successful upload
      setFile(null);
      setMaterialName("");
    } else {
      // Show an error message or validation feedback if required fields are not filled
      alert("Please select a file and provide a material name.");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upload Course Materials
      </Typography>
      <TextField
        label="Material Name"
        variant="outlined"
        value={materialName}
        onChange={handleMaterialNameChange}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <input
        type="file"
        accept=".pdf, .doc, .docx, .ppt, .pptx"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default UploadMaterials;
