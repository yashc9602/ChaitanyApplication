
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherLandingPage from "./components/TeacherLandingPage";
import UploadMaterials from "./components/UploadMaterials";
import TeacherRegistration from "./components/TeacherRegistration";
import TeacherLogin from "./components/TeacherLogin";
import AssignedBatches from "./components/AssignedBatches";
import BatchDetails from "./components/BatchDetails";
import { Toaster } from 'react-hot-toast';
import TeacherNavBar from "./components/TeacherNavBar";
// import YourCourses from "./components/YourCourses";
import YourBatches from "./components/YourBatches";


function App() {
  return (
    <Router>
      <TeacherNavBar />
      <Routes>
        <Route path="/" element={<TeacherLandingPage />} />
        <Route path="/teacher" element={<TeacherLandingPage />} />
        {/* <Route path="/teacher/course" element={<YourCourses />} /> */}
        <Route path="/teacher/batch" element={<YourBatches />} />
        <Route path="/teacher/upload-materials" element={<UploadMaterials />} />
        <Route path="/teacher/register" element={<TeacherRegistration />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/assigned-batches" element={<AssignedBatches />} />
        <Route path="/teacher/batch/:batchId/details" element={<BatchDetails />} />
        
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
