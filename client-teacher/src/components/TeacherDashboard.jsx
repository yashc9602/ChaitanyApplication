import TeacherNavMenu from "./TeacherNavMenu";
import AssignedBatches from "./AssignedBatches";
import TeacherNotifications from "./TeacherNotifications";
import TeacherCoursesEnrolled from "./TeacherCoursesEnrolled";
import TeacherProfile from "./TeacherProfile";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function TeacherDashboard() {
  const classes = useStyles();
  const [selectedMenuItem, setSelectedMenuItem] = useState("assignedBatches");

  // You may fetch and manage teacher data here using state and useEffect

  // useEffect(() => {
  //   // Fetch teacher data and assigned batches
  // }, []);

  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "assignedBatches":
        return <AssignedBatches />; // Component to display assigned batches
      case "notifications":
        return <TeacherNotifications />; // Component to display notifications
      case "coursesEnrolled":
        return <TeacherCoursesEnrolled />; // Component to display courses enrolled in
      case "profile":
        return <TeacherProfile />; // Component to display and edit teacher profile
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TeacherNavMenu
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </Grid>
        <Grid item xs={9}>
          {renderSelectedComponent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default TeacherDashboard;
