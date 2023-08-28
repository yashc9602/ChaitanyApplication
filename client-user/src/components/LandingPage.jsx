"@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Main, openState } from "./AppNavBar";
import { userIsLoggedInState } from "../store/selectors/userIsLoggedIn";
import "./style.css";
import ShowCourses from "./ShowCourses";
import Testimonials from "./Testimonials";
import Footer from "./Footer";


function LandingPage() {
  const [isLoggedIn] = useRecoilState(userIsLoggedInState);
  const [open] = useRecoilState(openState);
  const navigate = useNavigate();
  console.log(isLoggedIn);
  return (
    <>
    {/* <Main open={open}> */}
      <div className="landing-page-container m-16">
        <div className="text-content">
          <div className="title">
            The Art of {" "}
            <span style={{ color: "#bc1c44" }}>Teaching</span> <br /> is the Art of discovery
          </div>
          <button 
            className="button-style"
            onClick={() => navigate(isLoggedIn ? "/courses" : "/login")}>
            {isLoggedIn ? "View Courses" : "Join Us"}
          </button>
        </div>
      </div>
    {/* </Main> */}
    <div className="flex text-center text-xl ">
      <div className="p-8 flex-1 bg-orange-300">Live Classes</div>
      <div className="p-8 flex-1 bg-orange-200">Over 3000 Students</div>
      <div className="p-8 flex-1 bg-orange-300">Practical and immersive experience</div>
    </div>
    <div className="">
      <ShowCourses />
    </div>
    <div>
      <div className="text-4xl text-center p-12 bg-orange-200">
        Explore Certificates
      </div>
      <div className="grid grid-cols-2 auto-cols-auto place-items-center mb-10">
        <div className="text-center mt-6">
          <img className="max-w-xl" src="https://unblast.com/wp-content/uploads/2019/03/Certificate-Template.jpg" alt="" />
          <h1 className="pt-8 text-2xl font-sans underline">Certificate of Appreciation</h1>
        </div>
        <div className="text-center mt-6">
          <img className="max-w-xl" src="https://unblast.com/wp-content/uploads/2019/03/Certificate-Template.jpg" alt="" />
          <h1 className="pt-8 text-2xl font-sans underline">Certificate of Completion</h1>
        </div>
      </div>
    </div>
    <div>
      <Testimonials />
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
}

export default LandingPage;
