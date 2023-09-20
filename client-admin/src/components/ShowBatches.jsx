import { useEffect, useState } from "react";
import BatchCard from "./BatchCard"; // Create a BatchCard component for rendering individual batches
import { Typography } from "@mui/material";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { Main, openState } from "./AppNavBar";
import "../index.css";
import "./batchesStyles.css";

const batchesState = atom({
  key: "batchesState",
  default: [],
});

function ShowBatches() {
  const [batches, setBatches] = useRecoilState(batchesState);
  const [open] = useRecoilState(openState);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/batches/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBatches(res.data.batches);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Main open={open}>
      <Typography
        variant="h4"
        component="div"
        style={{
          flexGrow: 1,
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "#101460",
          textAlign: "center",
          marginTop: "70px",
          marginLeft: "210px",
        }}
      >
        Batches
      </Typography>
      <div className="batch-card-container">
        {batches.length > 0
          ? batches.map((batch) => (
              <BatchCard key={batch._id} batch={batch} />
            ))
          : "Oops! Batches are still not available. Create a new batch so that it can be accessed."}
      </div>
    </Main>
  );
}

export default ShowBatches;
export { batchesState };
