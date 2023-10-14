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

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [purCourses, setPurchasedCourses] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
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

  const isPurchased = purCourses.find((item) => item._id === id);

  const makePayment = () => {
    navigate(`/courses/${id}/payment`);
  };

  return (
    <div className="single-course p-4">
      <div className="text-container flex items-center space-x-4">
        <div>
          <img
            src={course.imageLink}
            alt={course.imageLink}
            className="w-72 rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="course-title text-3xl font-bold">
            {course.title}
          </h1>
        </div>

        <div>
          <h3 className="des">{course.description}</h3>
        </div>

        <div>
  {!isPurchased ? (
    <div>
      {course.prices && course.prices.length > 0 ? ( // Check if prices exists and is an array
        <Select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          variant="outlined"
          className="p-2 font-semibold text-lg rounded-full"
        >
          {course.prices.map((priceEntry, index) => (
            <MenuItem key={index} value={priceEntry.amount}>
              {`${priceEntry.currency} ${priceEntry.amount}`}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <p>No pricing information available</p> // Display a message if prices is undefined or empty
      )}
      <Button
        variant="contained"
        className="bg-red-500 p-2 font-semibold text-lg rounded-full ml-4"
        onClick={makePayment}
      >
        Buy
      </Button>
    </div>
  ) : (
    <div>
      <Button
        variant="contained"
        className="bg-green-500 p-2 font-semibold text-lg rounded-full"
      >
        Purchased
      </Button>
      <Button
        variant="contained"
        className="bg-gray-300 p-2 font-semibold text-lg rounded-full ml-4"
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
          className="bg-orange-300 text-white rounded-lg shadow-lg"
        >
          <CardActionArea>
            <CardContent className="text-center">
              <Typography
                variant="h4"
                component="div"
                className="text-2xl font-semibold"
              >
                Course Overview
              </Typography>
              <Box
                className="bg-white text-black rounded-lg p-4 mt-4"
              >
                <nav aria-label="main mailbox folders">
                  <List>
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
