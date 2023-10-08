import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

function CourseForm({
  isUpdate,
  createCourse,
  updateCourse,
  title,
  setTitle,
  description,
  setDescription,
  prices,
  setPrices,
  imageLink,
  setImageLink,
  published,
  setPublished,
  category,
  setCategory,
}) {
  const [message, setMessage] = useState("");

  // Function to add a new price entry for a currency
  const addPrice = () => {
    const newPrices = [...prices];
    newPrices.push({ currency: "USD", amount: "" });
    setPrices(newPrices);
  };

  // Function to update the price for a specific currency
  const updatePrice = (index, value) => {
    const newPrices = [...prices];
    newPrices[index].amount = parseFloat(value);
    setPrices(newPrices);
  };

  // Function to update the currency for a specific price entry
  const updateCurrency = (index, selectedCurrency) => {
    const newPrices = [...prices];
    newPrices[index].currency = selectedCurrency;
    setPrices(newPrices);
  };

  // Function to remove a price entry for a currency
  const removePrice = (index) => {
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  return (
    <div className="page">
      <div className="title">
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
            marginTop: "20px",
          }}
        >
          {isUpdate ? "Update Course" : "Create New Course"}
        </Typography>
        {message && (
          <div>
            <p className="message">{message}</p>
            <br />
          </div>
        )}
      </div>
      <Card className="form">
        <TextField
          className="input"
          label="Title"
          variant="outlined"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="description"
          className="input"
          label="Description"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className="input"
          label="Image URL"
          variant="outlined"
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        {prices.map((priceEntry, index) => (
          <div key={index}>
            <FormControl>
              <InputLabel
                style={{ paddingRight: "5px" }}
                htmlFor={`outlined-adornment-amount-${index}`}
              >
                Amount ({priceEntry.currency})
              </InputLabel>
              <OutlinedInput
                id={`outlined-adornment-amount-${index}`}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label={`Amount (${priceEntry.currency})`}
                value={priceEntry.amount}
                onChange={(e) => updatePrice(index, e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Currency</InputLabel>
              <Select
                value={priceEntry.currency}
                onChange={(e) => updateCurrency(index, e.target.value)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
                <MenuItem value="AUD">AUD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                {/* Add more currencies here */}
              </Select>
            </FormControl>
            <Button
              style={{
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
                marginLeft: "10px",
              }}
              className="button"
              variant="contained"
              onClick={() => removePrice(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          style={{ backgroundColor: "#101460", marginTop: "10px" }}
          className="button"
          variant="contained"
          onClick={addPrice}
        >
          Add Price
        </Button>
        <InputLabel id="demo-simple-select-label">Is Published</InputLabel>
        <Select
          style={{ padding: "0px", marginTop: "10px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        >
          <MenuItem value={false}>False</MenuItem>
          <MenuItem value={true}>True</MenuItem>
        </Select>
        <FormControl>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="language">Language</MenuItem>
            <MenuItem value="skill">Skill</MenuItem>
            <MenuItem value="lifestyle">Lifestyle</MenuItem>
          </Select>
        </FormControl>

        <br />
        <Button
          style={{ backgroundColor: "#101460", marginTop: "10px" }}
          className="button"
          variant="contained"
          onClick={() => (isUpdate ? updateCourse() : createCourse())}
        >
          {isUpdate ? "UPDATE" : "CREATE"}
        </Button>
      </Card>
    </div>
  );
}

export default CourseForm;
