import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { teacherState } from "../store/atoms/teacher";
import toast from "react-hot-toast";

import "../index.css";

function TeacherRegistrationPage() {
  const [teacher, setTeacher] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });
  const setTeacherRecoil = useSetRecoilState(teacherState);
  const [message, setMessage] = useState();

  const navigate = useNavigate();

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
        navigate("/teacher/TeacherDashboard");
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
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          value={teacher.name}
          onChange={(e) =>
            setTeacher((prev) => ({ ...prev, name: e.target.value }))
          }
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
        />
        <Button
          style={{ backgroundColor: "#101460", marginTop: "20px" }}
          className="button"
          variant="contained"
          onClick={handleRegister}
        >
          Register
        </Button>
        <br></br>
        <div>
          <h3 style={{ fontWeight: "500" }}>
            Already a teacher? Click here to login.
          </h3>
          <br />
          <Button
            style={{ backgroundColor: "#101460" }}
            className="button"
            variant="contained"
            onClick={() => navigate("/teacher/login")}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TeacherRegistrationPage;
