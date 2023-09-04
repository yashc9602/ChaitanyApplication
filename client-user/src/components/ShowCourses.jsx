import React, { useEffect, useState } from "react";
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
        }}
      >
        All Courses
      </Typography>
      <div className="all-courses mb-20">
        <FormControl>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              filterCoursesByCategory(e.target.value);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="language">Language</MenuItem>
            <MenuItem value="skill">Skill</MenuItem>
            <MenuItem value="lifestyle">Lifestyle</MenuItem>
          </Select>
        </FormControl>
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
