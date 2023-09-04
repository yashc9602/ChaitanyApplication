import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function TeacherCourses() {
  // You can fetch the list of courses assigned to the teacher from your API
  const [assignedCourses, setAssignedCourses] = useState([]);

  useEffect(() => {
    // Simulated data for illustration; replace with actual data fetching logic
    const mockAssignedCourses = [
      { id: "course1", title: "Mathematics 101", description: "Intro to Math", studentsCount: 20 },
      { id: "course2", title: "Physics 202", description: "Advanced Physics", studentsCount: 15 },
      // Add more assigned courses as needed
    ];

    setAssignedCourses(mockAssignedCourses);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Assigned Courses
      </Typography>
      <List>
        {assignedCourses.map((course) => (
          <ListItem key={course.id}>
            <ListItemText
              primary={course.title}
              secondary={`Description: ${course.description} | Students: ${course.studentsCount}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TeacherCourses;
