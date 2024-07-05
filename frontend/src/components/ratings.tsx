import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "3+",
  },
  {
    value: 25,
    label: "3.5+",
  },
  {
    value: 50,
    label: "4+",
  },
  {
    value: 75,
    label: "4.5+",
  },
  {
    value: 100,
    label: "5",
  },
];

const Ratings = () => {
  const [value, setValue] = React.useState<number | number[]>(75);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <div>
        {" "}
        {value == 0 ? (
          <div>over 3</div>
        ) : value == 25 ? (
          <div>over 3.5</div>
        ) : value == 50 ? (
          <div>over 4</div>
        ) : value == 75 ? (
          <div>over 4.5</div>
        ) : (
          <div>5</div>
        )}
      </div>
      <Slider
        track="inverted"
        aria-label="Restricted values"
        defaultValue={75}
        step={null}
        marks={marks}
        value={value}
        onChange={handleChange}
        sx={{
          color: "black",
          "& .MuiSlider-rail": {
            backgroundColor: "black", // Inactive track color
          },
          "& .MuiSlider-track": {
            backgroundColor: "lightgrey", // Active track color
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "white", // Thumb color
          },
          "& .MuiSlider-markLabel": {
            color: "gray",
          },
          " & .MuiSlider-markLabelActive": {
            color: "black",
          },
        }}
      />
    </Box>
  );
};

export default Ratings;
