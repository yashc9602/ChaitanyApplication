import { selector } from "recoil";
import { teacherState } from "../atoms/teacher";

export const teacherIsLoggedInState = selector({
  key: "teacherIsLoggedInState",
  get: ({ get }) => {
    const teacher = get(teacherState);
    return teacher.isLoggedIn;
  },
});
