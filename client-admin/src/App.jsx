import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LandingPage from "./components/LandingPage";
import ShowCourses from "./components/ShowCourses";
import CoursePage from "./components/CoursePage";
import AppNavBar from "./components/AppNavBar";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserList from "./components/UserList"; // Import the UserList component
import CreateBatch from "./components/CreateBatch"; // Import the CreateBatch component
import { Toaster } from 'react-hot-toast';
import ShowBatches from "./components/ShowBatches";

function App() {
  return (
    <Router>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/updateCourse/:courseId" element={<UpdateCourse />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/createBatch/:courseId/:teacherId" element={<CreateBatch />} />
        <Route path="/createbatch" element={<CreateBatch />} />
        <Route path="/batches" element={<ShowBatches />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
