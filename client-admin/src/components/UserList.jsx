import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function UserList({ users, courses, onAssignBatch }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const handleAssignBatch = () => {
    if (selectedUser && selectedBatch) {
      // Call a function to assign the selected batch to the selected user
      onAssignBatch(selectedUser, selectedBatch);
      // Clear the selections
      setSelectedUser("");
      setSelectedBatch("");
    }
  };

  return (
    <div className="user-list">
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {users.map((user) => (
        <Card key={user.id} className="user-card">
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          <Typography variant="subtitle1">
            Course Name: {user.courseName}
          </Typography>
          <FormControl>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              displayEmpty
              className="select-user"
            >
              <MenuItem value="" disabled>
                Assign Batch
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              displayEmpty
              className="select-batch"
            >
              <MenuItem value="" disabled>
                Select Batch
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.batchName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignBatch}
            className="assign-button"
          >
            Assign Batch
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default UserList;
