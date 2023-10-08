import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { teacherState } from "../store/atoms/teacher";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


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

function TeacherLoginPage() {
  const [teacher, setTeacher] = useState({ email: "", password: "" });
  const setTeacherRecoil = useSetRecoilState(teacherState);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    if (teacher.email.trim() === "" || teacher.password.trim() === "") {
      setMessage("Email/Password field cannot be empty.");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3000/teacher/login", {
          username: teacher.email,
          password: teacher.password,
        });

        setTeacherRecoil({
          email: teacher.email,
          username: teacher.email.split('@')[0].toUpperCase(),
          isLoggedIn: true,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", teacher.email);

        setMessage("");
        toast.success(response.data.message);
        navigate("/teacher/batch");
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
          Login To Teacher Dashboard
        </Typography>
        {message && (
          <p style={errorStyle}>{message}</p>
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
        <Button
          style={buttonStyle}
          variant="contained"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Typography variant="h6">
            New here?{" "}
            <a href="/teacher/register" style={linkStyle}>
              Click here to register a new account.
            </a>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default TeacherLoginPage;
