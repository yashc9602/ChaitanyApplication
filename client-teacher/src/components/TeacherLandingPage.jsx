import { useNavigate } from "react-router-dom";
import { teacherIsLoggedInState } from "../store/selectors/TeacherIsLoggedin";
import { Main, openState } from "./TeacherNavBar";
import { useRecoilState } from "recoil";
import "./style.css";

function TeacherLandingPage() {
  const [isLoggedIn] = useRecoilState(teacherIsLoggedInState);
  const [open] = useRecoilState(openState);
  const navigate = useNavigate();

  return (
    <Main open={open}>
      <div className="landing-page-container">
        <div className="text-content">
          <h1 className="title">Teacher Dashboard</h1>

          <button
            className="button-style"
            onClick={() => navigate(isLoggedIn ? "/teacher/TeacherDashboard" : "/teacher/login")}
          >
            {isLoggedIn ? "Go to Dashboard" : "Login Here"}
          </button>
        </div>
  
      </div>
    </Main>
  );
}

export default TeacherLandingPage;
