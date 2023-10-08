import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { teacherState } from "../store/atoms/teacher";
import toast from "react-hot-toast";

import "../index.css";

const cardStyle = {
  padding: "20px",
  width: "300px",
  margin: "auto",
  marginTop: "50px",
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const textFieldStyle = {
  marginBottom: "15px",
};

const buttonStyle = {
  backgroundColor: "#101460",
  color: "#fff",
  marginTop: "20px",
};

const errorStyle = {
  color: "#bc1c44",
  fontWeight: "500",
  fontSize: "16px",
  marginBottom: "15px",
  textAlign: "center",
};

const linkStyle = {
  color: "#101460",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
};

function TeacherRegistrationPage() {
  const [teacher, setTeacher] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });
  const setTeacherRecoil = useSetRecoilState(teacherState);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (
      teacher.email.trim() === "" ||
      teacher.password.trim() === "" ||
      teacher.name.trim() === "" ||
      teacher.phoneNumber.trim() === ""
    ) {
      setMessage("All fields are required.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/teacher/signup",
          {
            username: teacher.email,
            password: teacher.password,
            name: teacher.name,
            phoneNumber: teacher.phoneNumber,
          }
        );

        setTeacherRecoil({
          email: teacher.email,
          username: teacher.email.split("@")[0].toUpperCase(),
          isLoggedIn: true,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", teacher.email);

        setMessage("");
        toast.success(response.data.message);
        // Redirect to the Teacher Dashboard or another page
      } catch (err) {
        console.error(err);
        setMessage(err.response.data.message);
      }
    }
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
            marginTop: "50px",
            marginBottom: "10px",
          }}
        >
          Register as a Teacher
        </Typography>
        {message && (
          <div>
            <p style={errorStyle}>{message}</p>
          </div>
        )}
      </div>
      <Card style={cardStyle}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          value={teacher.email}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, email: e.target.value }))
          }
          style={textFieldStyle}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={teacher.password}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, password: e.target.value }))
          }
          style={textFieldStyle}
          fullWidth
        />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          value={teacher.name}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, name: e.target.value }))
          }
          style={textFieldStyle}
          fullWidth
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          type="text"
          value={teacher.phoneNumber}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          style={textFieldStyle}
          fullWidth
        />
        <Button
          style={buttonStyle}
          variant="contained"
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Typography variant="h6">
            Already a teacher?{" "}
            <a href="/teacher/login" style={linkStyle}>
              Click here to login.
            </a>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default TeacherRegistrationPage;
