import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { teacherState } from "../store/atoms/teacher"; // Make sure to import the correct teacher atom
import { toast } from "react-hot-toast";

import "../index.css";

function TeacherLoginPage() {
  const [teacher, setTeacher] = useState({ email: "", password: "" });
  const setTeacherRecoil = useSetRecoilState(teacherState); // Make sure to use the correct teacher atom
  const [message, setMessage] = useState();

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
        navigate("/teacher/TeacherDashboard"); // Update the destination URL
      } catch (err) {
        console.log(err);
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
          <div>
            <p
              style={{
                textAlign: "center",
                color: "#bc1c44",
                fontWeight: "500",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              {message}
            </p>
          </div>
        )}
      </div>
      <Card className="form">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          value={teacher.email}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, email: e.target.value }))
          }
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
        />
        <Button
          style={{ backgroundColor: "#101460" }}
          className="button"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
        <br></br>
        <div>
          <h3 style={{ fontWeight: "500" }}>
            New here? Click here to register a new account.
          </h3>
          <br />
          <Button
            style={{ backgroundColor: "#101460" }}
            className="button"
            variant="contained"
            onClick={() => navigate("/teacher/register")} // Update the registration route
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TeacherLoginPage;