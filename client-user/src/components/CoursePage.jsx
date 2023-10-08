import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./coursesStyles.css";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [purCourses, setPurchasedCourses] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(""); // Store the selected price
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/courses/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/users/purchasedCourses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // check if the course is purchased or not
  const isPurchased = purCourses.filter((item) => item._id === id).length === 1;

  const makePayment = () => {
    navigate(`/courses/${id}/payment`);
  };

  return (
    <div className="single-course">
      <div className="text-container">
        <div>
          <img
            src={course.imageLink}
            alt={course.imageLink}
            width="300px"
            style={{ borderRadius: "20px" }}
          />
        </div>

        <div>
          <h1 className="course-title">{course.title}</h1>
        </div>

        <div>
          <h3 className="des">{course.description}</h3>
        </div>

        <div>
          {!isPurchased ? (
            <div>
              <Select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                variant="outlined"
                style={{
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
              >
                {course.prices.map((priceEntry, index) => (
                  <MenuItem
                    key={index}
                    value={priceEntry.amount}
                  >{`${priceEntry.currency} ${priceEntry.amount}`}</MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#bc1c44",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  marginLeft: "10px",
                }}
                onClick={makePayment}
              >
                Buy
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
              >
                Purchased
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ccd5ae",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  marginLeft: "20px",
                }}
              >
                View Content
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <Card
          sx={{ width: "350px" }}
          style={{
            backgroundColor: " #d4a373",
            color: "white",
            borderRadius: "10px",
            paddingRight: "6px",
            display: "flex",
            padding: "8px",
          }}
        >
          <CardActionArea>
            <CardContent style={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h4" component="div">
                Course Overview
              </Typography>
              <br />
              <Box
                sx={{
                  bgcolor: "background.paper",
                  color: "black",
                  borderRadius: "20px",
                  padding: "20px 5px",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List style={{ padding: "10px" }}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SignalCellularAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beginner to Pro" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <OndemandVideoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Live Interaction" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="4 Classes a month" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DownloadIcon />
                        </ListItemIcon>
                        <ListItemText primary="Experiential Learning" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <ClosedCaptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="English Language" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MilitaryTechIcon />
                        </ListItemIcon>
                        <ListItemText primary="Certificate of Completion" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default CoursePage;
