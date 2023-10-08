import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/joy/CircularProgress';
import { Typography, FormControl, InputLabel,Select,MenuItem } from "@mui/material";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { Main, openState } from "./AppNavBar";
import "./coursesStyles.css";

const coursesState = atom({
  key: "coursesState",
  default: {
    allCourses: [],
    filteredCourses: [],
  },
});

function ShowCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useRecoilState(coursesState);
  const [open] = useRecoilState(openState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterCoursesByCategory = (category) => {
    if (category === "all") {
      setCourses({ ...courses, filteredCourses: courses.allCourses });
    } else {
      const filtered = courses.allCourses.filter((course) => course.category === category);
      setCourses({ ...courses, filteredCourses: filtered });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/courses/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses({ allCourses: res.data.courses, filteredCourses: res.data.courses });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <Main open={open}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Typography
      variant="h4"
      component="div"
      style={{
        flexGrow: 1,
        padding: "20px",
        borderRadius: "4px",
        fontWeight: "bold",
        color: "#101460",
        textAlign: "center",
        marginTop: "70px",
        marginLeft: "20%",
      }}
    >
      All Courses
    </Typography>
    <div style={{ display: "flex", alignItems: "center"}}>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginRight: "10px",
          color: selectedCategory === "all" ? "#101460" : "#000", // Highlight selected category
          cursor: "pointer",
        }}
        onClick={() => filterCoursesByCategory("all")}
      >
        All
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginRight: "10px",
          color: selectedCategory === "language" ? "#101460" : "#000", // Highlight selected category
          cursor: "pointer",
        }}
        onClick={() => filterCoursesByCategory("language")}
      >
        Language
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginRight: "10px",
          color: selectedCategory === "skill" ? "#101460" : "#000", // Highlight selected category
          cursor: "pointer",
        }}
        onClick={() => filterCoursesByCategory("skill")}
      >
        Skill
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: selectedCategory === "lifestyle" ? "#101460" : "#000", // Highlight selected category
          cursor: "pointer",
        }}
        onClick={() => filterCoursesByCategory("lifestyle")}
      >
        Lifestyle
      </Typography>
    </div>
  </div>

  <div className="all-courses mb-20">
    {isLoading ? (
      <CircularProgress size="sm" color="neutral" />
    ) : (
      courses.filteredCourses.length > 0 ? (
        courses.filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))
      ) : (
        "Oops! No course is currently offered in this category. Return later!"
      )
    )}
  </div>
</Main>



  );
}

export default ShowCourses;
