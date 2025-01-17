import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { atom, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { teacherState } from "../store/atoms/teacher";
import Button from "@mui/material/Button";
import FolderIcon from "@mui/icons-material/Folder";
import "./style.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const openState = atom({
  key: "openState",
  default: false,
});

export default function TeacherNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useRecoilState(openState);
  const [teacher, setTeacher] = useRecoilState(teacherState);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: "#023047",
          height: "60px",
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => teacher.isLoggedIn && handleDrawerOpen()}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onMouseOver={() => (document.body.style.cursor = "pointer")}
            onClick={() => navigate("/teacher")}
          >
            Your Teacher Dashboard
          </Typography>
          {teacher.isLoggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("teacherToken");
                localStorage.removeItem("teacherIsLoggedIn");
                localStorage.removeItem("teacherEmail");
                setTeacher({
                  email: "",
                  password: "",
                  isLoggedIn: false,
                });
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button color="inherit" onClick={() => navigate("/teacher/register")}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate("/teacher/login")}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {teacher.isLoggedIn && (
            <List>
              {/* add user name and email */}
              <ListItem key="name" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {/* <AccountBoxIcon /> */}
                  </ListItemIcon>
                  <ListItemText
                    primary={teacher?.username}
                    secondary={teacher?.email}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose();
                navigate("/teacher/course");
              }}
            >
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={"Your Courses"} />
            </ListItemButton>
          </ListItem>
        </List> */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose();
                navigate("/teacher/batch");
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={"Your Batches"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export { Main, openState };
