import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, ClickAwayListener } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

interface ratingsProps {
  rating: string;
  setRating: (updatedList: string) => void;
}

const Ratings: React.FC<ratingsProps> = ({ rating, setRating }) => {
  const [_value, setValue] = [rating, setRating];
  const [open, setOpen] = React.useState(false);
  const [tempValue, setTempValue] = React.useState<number | number[]>(75);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setTempValue(newValue);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const handleReset = () => {
    setOpen(false);
    setValue("-1");
    setTempValue(75);
  };

  const handleFilter = () => {
    if (tempValue == 0) {
      setValue("3");
    } else if (tempValue == 25) {
      setValue("3.5");
    } else if (tempValue == 50) {
      setValue("4");
    } else if (tempValue == 75) {
      setValue("4.5");
    } else if (tempValue == 100) {
      setValue("5");
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={handleButtonClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: open ? "black" : "white",
            height: "57px",
            fontSize: "16px",
            color: open ? "white" : "black",
            "&:hover": {
              backgroundColor: open ? "black" : "lightgrey",
            },
          }}
        >
          Filter by Rating
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
            <div>
              {tempValue == 0 ? (
                <div>over 3</div>
              ) : tempValue == 25 ? (
                <div>over 3.5</div>
              ) : tempValue == 50 ? (
                <div>over 4</div>
              ) : tempValue == 75 ? (
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
              value={tempValue}
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

export default Ratings;
