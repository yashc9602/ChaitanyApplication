import { atom } from "recoil";

export const teacherState = atom({
  key: "teacherState",
  default: {
    email: localStorage.getItem("email"), // Adjust the key accordingly
    username: localStorage.getItem("email")?.split('@')[0].toUpperCase(), // Adjust the key accordingly
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Adjust the key accordingly
  },
});
