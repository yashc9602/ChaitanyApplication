import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function TeacherNavMenu() {
  return (
    <div className="flex">
        <List>
        <ListItem button component={Link} to="/teacher">
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/teacher/courses">
            <ListItemText primary="Assigned Batches" />
        </ListItem>
        <ListItem button component={Link} to="/teacher/upload-materials">
            <ListItemText primary="Upload Materials" />
        </ListItem>
        {/* Add more navigation items as needed */}
        </List>
    </div>
  );
}

export default TeacherNavMenu;
