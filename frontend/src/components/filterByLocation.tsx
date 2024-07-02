import { useState} from "react";
import useRequest from "../utils/requestHandler";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';



const FilterByLocation  = ({filterState }) => {
const [filteredPostList, setFilteredPostList] = filterState ;
  const [value, setValue] = useState(60); 
  const [open, setOpen] = useState(false); 
  const [refresh, SetRefresh] = useState(true);
  const [postList, setPostList] = useState<any[]>([]); 
  const [oldPostList, setOldPostList] = useState<any[]>([]);
  const apiFetch = useRequest();

  const marks = [
    { value: 0, label: '0 KM' },
    { value: 50, label: '50 KM' },
    { value: 100, label: '100 KM' },
  ];

  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };

  const getPostList = async (distance) => {
    try {
      console.log("this",JSON.stringify(postList), typeof(JSON.stringify(postList)));
      const response = await apiFetch(`posts/filterByDistance/${distance}/${JSON.stringify(oldPostList)}`, { method: 'GET' });
      console.log("the response", response)
      return response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    if (refresh){
        SetRefresh(false)
        setOldPostList(filteredPostList) 
        setPostList(filteredPostList)  
        console.log("first tie", postList, filteredPostList)
    }

    setOpen((prev) => !prev);

    console.log("how many times")
  };


  const handleClickAway = () => {
    setOpen(false);
    console.log("post List:" , filteredPostList) 

  };

  const handleReset = () => {
    setOpen(false); 
    setFilteredPostList(oldPostList);
    setPostList(oldPostList);
  };


  const handleFilter =  async () => {
    const response = await getPostList(value);
    console.log("response 2", response);
    if (response){
        setPostList(response);
        console.log("post List1:" , postList) 
        setFilteredPostList(response);
        console.log("post List2:" , filteredPostList) 

    }

  };
  

  const filterByLocationButton  = () => {
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Button
                    onClick={handleButtonClick}
                    sx={{
                        backgroundColor: open ? 'black' : 'white',
                        color: open ? 'white' : 'black',
                        '&:hover': {
                        backgroundColor: open ? 'black' : 'lightgrey',
                        },
                    }}
                    >
                    Filter by Distance
                </Button>
                {open && (
                <Box
                    sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    mt: 1,
                    p: 2,
                    width: 350,
                    bgcolor: 'white',
                    boxShadow: 4,
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    }}
                >
                    <div>Under {value} KM</div>
                    <Slider
                    aria-label="Custom marks"
                    defaultValue={60}
                    getAriaValueText={(value) => `${value} KM`}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={handleChange}
                    value={value}
                    sx={{
                        mt: 2, 
                        width:'80%',
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3,}}>
                        <Button variant="contained" onClick={handleReset} sx={{ mr: 1, backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                        backgroundColor: 'lightgrey',
                        },}}>
                            Reset
                        </Button>
                        <Button variant="contained" onClick={handleFilter}  
                            sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'grey',
                                },
                            }}>
                            Filter
                        </Button>
                        </Box>
                </Box>
                )}
            </Box>
        </ClickAwayListener>
    );

  };
  return (
    <div>
        {filterByLocationButton()}
    </div>
  );
};
export default FilterByLocation;
