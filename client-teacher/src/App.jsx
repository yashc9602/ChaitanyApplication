
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherLandingPage from "./components/TeacherLandingPage";
import TeacherCourses from "./components/TeacherCourses";
import UploadMaterials from "./components/UploadMaterials";
// import TeacherNavMenu from "./components/TeacherNavMenu";
import TeacherRegistration from "./components/TeacherRegistration";
import TeacherLogin from "./components/TeacherLogin";
import AssignedBatches from "./components/AssignedBatches";
import BatchDetails from "./components/BatchDetails";
// import UploadMaterials from "./components/UploadMaterials";
import { Toaster } from 'react-hot-toast';
import TeacherNavBar from "./components/TeacherNavBar";

function App() {
  return (
    <Router>
      <TeacherNavBar />
      <Routes>
        <Route path="/" element={<TeacherLandingPage />} />
        <Route path="/teacher" element={<TeacherLandingPage />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />
        <Route path="/teacher/upload-materials" element={<UploadMaterials />} />
        <Route path="/teacher/register" element={<TeacherRegistration />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/assigned-batches" element={<AssignedBatches />} />
        <Route path="/teacher/batch/:batchId" element={<BatchDetails />} />
        {/* Add more routes for teacher-related pages as needed */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
