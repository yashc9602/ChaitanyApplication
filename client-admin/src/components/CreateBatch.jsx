import { useState, useEffect } from "react";
import BatchForm from "./BatchForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function CreateBatch(props) {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [courses, setCourses] = useState([]); // Add state for courses
  const [courseId, setCourseId] = useState("");
  const [teachers, setTeachers] = useState([]); // Add state for teachers
  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
    // Fetch the list of courses and teachers here
    // Example code for fetching courses:
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

    // Example code for fetching teachers:
  useEffect(() => {
    // Fetch the list of teachers here
    fetch("http://localhost:3000/admin/teachers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched teachers:", data); // Log the response
        setTeachers(data.teachers);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);
    

  function createBatch() {
    fetch("http://localhost:3000/admin/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        maxStudents,
        courseId, // Include courseId
        teacherId, // Include teacherId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setName("");
        setStartDate("");
        setEndDate("");
        setMaxStudents("");
        setCourseId(""); // Reset courseId
        setTeacherId(""); // Reset teacherId
        navigate("/batches");
      })
      .catch((err) => console.log(err));
  }

  

  function updateBatch() {
    const { batchId, courseId, teacherId } = props;
  
    fetch(`http://localhost:3000/admin/batches/${batchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        maxStudents,
        courseId,
        teacherId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        // Redirect to the batches page or any other appropriate page
        navigate("/batches");
      })
      .catch((err) => {
        console.error("Error updating batch:", err);
        toast.error("Failed to update batch");
      });
  }
  console.log("Selected Teacher ID:", teacherId);

  console.log("Teachers:", teachers);


  return (
    <BatchForm
      isUpdate={isUpdate}
      createBatch={createBatch}
      updateBatch={updateBatch}
      batchName={name}
      setBatchName={setName}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      maxStudents={maxStudents}
      setMaxStudents={setMaxStudents}
      courseId={courseId}
      setCourseId={setCourseId}
      teacherId={teacherId}
      setTeacherId={setTeacherId}
      courses={courses} // Pass the fetched courses
      teachers={teachers} // Pass the fetched teachers
    />
  );
}

export default CreateBatch;
