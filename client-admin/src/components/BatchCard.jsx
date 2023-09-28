import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { batchesState } from "./ShowBatches"; // Assuming you have a batchesState atom
import axios from "axios";
import { toast } from "react-hot-toast";

function BatchCard(props) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [batches, setBatches] = useRecoilState(batchesState);

  function deleteBatch() {
    var userInput = window.prompt("Type DELETE to delete the batch: ");
    const id = props.batch._id;
    if (userInput === "DELETE") {
      axios
        .delete(`http://localhost:3000/admin/batches/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setBatches(batches.filter((batch) => batch._id !== id));
          toast.success(res.data.message);
          navigate("/batches");
        })
        .catch((err) => console.log(err));
    }
  }

  // Function to format date in "dd MMM yyyy" format
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <Card
        className="batch-card"
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <CardContent className="batch-details">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={`batch-title ${isMouseOver ? "highlight" : ""}`}
          >
            {props.batch.name}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            className="batch-description"
          >
            Start Date: {formatDate(props.batch.startDate)}<br />
            End Date: {formatDate(props.batch.endDate)}<br />
            Max Students: {props.batch.maxStudents}<br />
            Course ID: {props.batch.courseId}<br />
            Teacher ID: {props.batch.teacherId}
          </Typography>
          <div className="batch-actions">
            <Button
              variant="contained"
              className="batch-button batch-delete-button"
              onClick={() => deleteBatch()}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

BatchCard.propTypes = {
  batch: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    maxStudents: PropTypes.number.isRequired,
    courseId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired,
  }).isRequired,
};

export default BatchCard;
