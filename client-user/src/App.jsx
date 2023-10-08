import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Appbar from "./components/Appbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LandingPage from "./components/LandingPage";
import ShowCourses from "./components/ShowCourses";
import CoursePage from "./components/CoursePage";
import PurchasedCourses from "./components/PurchasedCourses";
import AppNavBar from "./components/AppNavBar";
import PaymentForm from "./components/PaymentForm";
import AddCourse from "./components/AddCourse";
import { Toaster } from 'react-hot-toast';
import AssignedBatches from "./components/AssignedBatches";
import BatchDetails from "./components/BatchDetails";
import AboutUs from "./components/AboutUs";
import ContactForm from "./components/ContactUs";

function App() {
  return (
    <Router>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/courses/purchased" element={<PurchasedCourses />} />
        <Route path="/courses/:id/payment" element={<PaymentForm />} />
        <Route path="/courses/:id/confirm-payment" element={<AddCourse />} />
        <Route path="/assigned-batches" element={ <AssignedBatches />} />
        <Route path="/batch-details/:batchId/materials" element={<BatchDetails />} />
        <Route path="/about" element={<AboutUs />}  />
        <Route path="/contact-us" element={<ContactForm />}  />

      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
