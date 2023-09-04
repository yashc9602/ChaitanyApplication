import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import toast from "react-hot-toast";

import "../index.css";

function RegisterPage() {
  const [user, setUser] = useState({ email: "", password: "", name: "", phoneNumber: "" });
  const setUserRecoil = useSetRecoilState(userState);
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (user.email.trim() === "" || user.password.trim() === "" || user.name.trim() === "" || user.phoneNumber.trim() === "") {
      setMessage("All fields are required.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/signup",
          {
            username: user.email,
            password: user.password,
            name: user.name,
            phoneNumber: user.phoneNumber,
          }
        );

        setUserRecoil({
          email: user.email,
          username: user.email.split('@')[0].toUpperCase(),
          isLoggedIn: true,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", user.email);
        setMessage("");
        toast.success(response.data.message);
        navigate("/courses");
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
          Register A New Account
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
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <TextField
          id="name"
          label="Full Name"
          variant="outlined"
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          type="text"
          value={user.phoneNumber}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
        <Button
          style={{ backgroundColor: "#101460" }}
          className="button"
          variant="contained"
          onClick={handleRegister}
        >
          Register
        </Button>
        <br></br>
        <div>
          <h3 style={{ fontWeight: "500" }}>
            Already a user? Click here to login.
          </h3>
          <br />
          <Button
            style={{ backgroundColor: "#101460" }}
            className="button"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
