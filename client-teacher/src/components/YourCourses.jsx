import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

function YourCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the courses assigned to the teacher from the server
    axios
      .get("http://localhost:3000/teacher/course", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourses(response.data.courses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Assigned Courses
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {courses.map((course) => (
            <Card key={course._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography color="text.secondary">{course.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Box>
  );
}

export default YourCourses;
