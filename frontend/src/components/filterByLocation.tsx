import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface distanceStateType {
  value: number | number[];
  setValue: (updatedList: number | number[]) => void;
}
const FilterByLocation: React.FC<distanceStateType> = ({ value, setValue }) => {
  const [_distance, setDistance] = [value, setValue];
  const [open, setOpen] = useState(false);
  const [tempDistance, setTempDistance] = useState<number | number[]>(-1);

  const marks = [
    { value: 0, label: "0 KM" },
    { value: 50, label: "50 KM" },
    { value: 100, label: "100 KM" },
  ];

  const handleChange = async (_event: Event, newValue: number | number[]) => {
    setTempDistance(newValue);
  };

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const handleFilter = () => {
    setDistance(tempDistance);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setOpen(false);
    setDistance(-1);
    setTempDistance(-1);
  };

  const filterByLocationButton = () => {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Button
            onClick={handleButtonClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              display: "flex",
              backgroundColor: open ? "black" : "white",
              height: "57px",
              fontSize: "16px",
              color: open ? "white" : "black",
              "&:hover": {
                backgroundColor: open ? "black" : "lightgrey",
              },
              width: "250px",
            }}
          >
            Filter by Distance
          </Button>
          {open && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                mt: 1,
                p: 2,
                width: 350,
                bgcolor: "white",
                boxShadow: 4,
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              {tempDistance === -1 ? (
                <div> Under 0 KM </div>
              ) : (
                <div>Under {tempDistance} KM</div>
              )}
              <Slider
                aria-label="Custom marks"
                defaultValue={60}
                getAriaValueText={(tempDistance) => `${tempDistance} KM`}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={handleChange}
                value={tempDistance}
                sx={{
                  mt: 2,
                  width: "80%",
                  "& .MuiSlider-track": {
                    backgroundColor: "black",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "black",
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                  },
                  "& .MuiSlider-markLabel": {
                    color: "gray",
                  },
                  "& .MuiSlider-markLabelActive": {
                    color: "black",
                  },
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}
              >
                <Button
                  variant="contained"
                  onClick={handleReset}
                  sx={{
                    mr: 1,
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "lightgrey",
                    },
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={handleFilter}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "grey",
                    },
                  }}
                >
                  Filter
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    );
  };
  return <div>{filterByLocationButton()}</div>;
};
export default FilterByLocation;
