import { atom } from "recoil";

export const teacherState = atom({
  key: "teacherState",
  default: {
    email: localStorage.getItem("teacherEmail"), // Adjust the key accordingly
    username: localStorage.getItem("teacherEmail")?.split('@')[0].toUpperCase(), // Adjust the key accordingly
    isLoggedIn: localStorage.getItem("isTeacherLoggedin") !== null, // Adjust the key accordingly
  },
});
