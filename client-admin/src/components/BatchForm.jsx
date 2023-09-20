import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function BatchForm({
  isUpdate,
  createBatch,
  updateBatch,
  batchName,
  setBatchName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  maxStudents,
  setMaxStudents,
  courseId,
  setCourseId,
  teacherId,
  setTeacherId,
  courses, // Ensure courses is defined
  teachers, // Ensure teachers is defined
}) {
  const [message, setMessage] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");

  const handleTeacherChange = (e) => {
    const selectedTeacherId = e.target.value;
    setTeacherId(selectedTeacherId);

    // Find the selected teacher's name based on the _id and set it for display
    const selectedTeacher = teachers.find((teacher) => teacher._id === selectedTeacherId);
    setSelectedTeacherName(selectedTeacher ? selectedTeacher.name : "");
  };

  return (
    <div className="page">
      <div className="title">
        <Typography
          variant="h4"
          component="div"
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "#101460",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {isUpdate ? "Update Batch" : "Create New Batch"}
        </Typography>
        {message && (
          <div>
            <p className="message">{message}</p>
            <br />
          </div>
        )}
      </div>
      <Card className="form">
        <TextField
          className="input"
          label="Batch Name"
          variant="outlined"
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />
        <TextField
          className="input"
          label="Start Date"
          variant="outlined"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="input"
          label="End Date"
          variant="outlined"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="input"
          label="Max Students"
          variant="outlined"
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
        />
        <FormControl>
          <InputLabel htmlFor="courseId">Course</InputLabel>
          <Select
            className="input"
            label="Course"
            variant="outlined"
            value={courseId || ""}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {courses &&
              courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="teacherId">Teacher</InputLabel>
          <Select
            className="input"
            label="Teacher"
            variant="outlined"
            value={teacherId || ""}
            onChange={handleTeacherChange} // Use the handleTeacherChange function
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teachers &&
              teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>


        <br />
        <Button
          style={{ backgroundColor: "#101460" }}
          className="button"
          variant="contained"
          onClick={() => (isUpdate ? updateBatch() : createBatch())}
        >
          {isUpdate ? "UPDATE" : "CREATE"}
        </Button>
      </Card>
    </div>
  );
}

export default BatchForm;
