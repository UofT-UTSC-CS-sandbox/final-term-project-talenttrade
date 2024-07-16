import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./category.css"; // Import the CSS file
import { TopNeedType, TopOfferType, TopTradeType } from "../pages/HomePage";
import { Button, InputAdornment, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import host from "../utils/links";
import { PostType } from "../pages/Post";
import Post from "../pages/Post";
import axios from "axios";

interface CategoryProps {
  title: string;
  popularListings: TopNeedType[] | TopOfferType[] | TopTradeType[];
}

const Category: React.FC<CategoryProps> = ({ title, popularListings }) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostType[]>([]);
  const [selectedButton, setSelectedButton] = useState("button0");
  const top3 = popularListings.slice(0, 3);
  const [currentSet, setCurrentSet] = useState<PostType[]>([]);
  const [setNum, setSetNum] = useState(1);

  useEffect(() => {
    if (postList.length == 0) {
      const index = parseInt(selectedButton.replace("button", ""));
      getPostList(index);
    }
  }, [selectedButton, top3]);

  useEffect(() => {
    if (postList.length != 0) {
      setCurrentSet(postList.slice(0, 3));
    }
  }, [postList]);

  const isTopNeedType = (item: any): item is TopNeedType =>
    "need" in item && !("offer" in item);
  const isTopOfferType = (item: any): item is TopOfferType =>
    "offer" in item && !("need" in item);
  const isTopTradeType = (item: any): item is TopTradeType =>
    "offer" in item && "need" in item;

  const getPostList = async (selected: number) => {
    let need: string | undefined;
    let offer: string | undefined;
    if (selected < top3.length) {
      const selectedItem = top3[selected];
      if (isTopTradeType(selectedItem)) {
        need = selectedItem.need;
        offer = selectedItem.offer;
      } else if (isTopNeedType(selectedItem)) {
        need = selectedItem.need;
      } else if (isTopOfferType(selectedItem)) {
        offer = selectedItem.offer;
      }
    }

    try {
      let response;
      if (need && offer) {
        response = await axios.get(`${host}/posts/post-trade/`, {
          params: { need, offer },
        });
      } else if (need) {
        response = await axios.get(`${host}/posts/post-need/`, {
          params: { need },
        });
      } else if (offer) {
        response = await axios.get(`${host}/posts/post-offer/${offer}/false`);
      }
      if (response) {
        setPostList(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleButtonClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newSelectedButton: string
  ) => {
    setSelectedButton(newSelectedButton);
    if (newSelectedButton === "seeMore") {
      handleSeeAll();
    } else {
      const index = parseInt(newSelectedButton.replace("button", ""));
      getPostList(index);
    }
  };

  const handleNextClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (setNum < postList.length / 3) {
      setCurrentSet(postList.slice(3 * setNum, 3 * (setNum + 1)));
      setSetNum(setNum + 1);
      console.log(setNum);
    }
  };

  const handlePrevClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (setNum > 1) {
      setCurrentSet(postList.slice(3 * (setNum - 2), 3 * (setNum - 1)));
      setSetNum(setNum - 1);
    }
  };

  const handleSeeAll = () => {
    let link;
    title == "Most Popular Trades"
      ? (link = `MostPopularTrades`)
      : title == "Most Needed Talents"
      ? (link = `MostNeededTalents`)
      : (link = `MostOfferedTalents`);

    navigate(`/${link}`);
  };

  const getLink = (top3: TopNeedType[] | TopOfferType[] | TopTradeType[]) => {
    if (top3.length != 0) {
      let selectedItem = top3[parseInt(selectedButton.replace("button", ""))];
      if (isTopTradeType(selectedItem)) {
        return `/view-posts-by-category?need=${selectedItem.need}&offer=${selectedItem.offer}&show=false`;
      } else if (isTopNeedType(selectedItem)) {
        return `/view-posts-by-category?need=${selectedItem.need}&show=false`;
      } else {
        return `/view-posts-by-category?offer=${selectedItem.offer}&show=false`;
      }
    }
    return `/`;
  };

  return (
    <Stack spacing={1}>
      <Typography
        noWrap
        component="div"
        sx={{
          display: { xs: "none", sm: "block" },
          paddingLeft: 5,
          alignItems: "flex-start",
          color: "black",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={5}
        sx={{ paddingLeft: 5, paddingBottom: 5 }}
      >
        <Stack spacing={1} width={"20%"} sx={{ paddingTop: "10px" }}>
          {top3.map((top, index) => (
            <Button
              key={`button${index}`}
              disableElevation
              onClick={(e) => handleButtonClick(e, `button${index}`)}
              sx={{
                fontSize: "1rem",
                minHeight: "55px",
                textAlign: "start",
                gap: 0,
                whiteSpace: "pre-line",
                textTransform: "none",
                border: selectedButton === `button${index}` ? 1 : 0,
                color: "black",
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                  border: selectedButton === `button${index}` ? 1 : 0,
                },
                backgroundColor:
                  selectedButton === `button${index}` ? "#f4f4f4" : "white",
              }}
              endIcon={
                <InputAdornment position="end">
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#757575",
                      textTransform: "none",
                    }}
                  >
                    {top.count.toString() + " posts"}
                  </Typography>
                </InputAdornment>
              }
            >
              {isTopTradeType(top)
                ? `NEED: ${top.need} \nOFFER: ${top.offer}`
                : isTopNeedType(top)
                ? `${top.need}`
                : `${top.offer}`}
            </Button>
          ))}
          <Button
            key={`seeMore`}
            disableElevation
            onClick={(e) => handleButtonClick(e, `seeMore`)}
            sx={{
              textAlign: "start",
              whiteSpace: "pre-line",
              border: selectedButton === `seeMore` ? 1 : 0,
              color: "black",
              "&:hover": {
                backgroundColor: "#f4f4f4",
                border: selectedButton === `seeMore` ? 1 : 0,
              },
              backgroundColor:
                selectedButton === `seeMore` ? "#f4f4f4" : "white",
            }}
          >
            See all
          </Button>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {setNum > 1 && (
            <IconButton aria-label="back" onClick={handlePrevClick}>
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
          {setNum == 1 && (
            <IconButton aria-label="back" disabled>
              <ArrowBackIosNewIcon sx={{ color: "#dedede" }} />
            </IconButton>
          )}
          <Stack spacing={0.5}>
            <Typography
              variant="overline"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                paddingLeft: 5,
                textAlign: "end",
                minWidth: "855px",
              }}
            >
              <Link
                to={getLink(top3)}
                className="link"
                style={{
                  color: "black",
                }}
              >
                See all
              </Link>
            </Typography>
            <Stack direction="row" spacing={2} sx={{ minWidth: "855px" }}>
              {currentSet.map((post, _index) => (
                <Post key={post.id} post={post} />
              ))}
            </Stack>
          </Stack>
          {setNum < postList.length / 3 ? (
            <IconButton
              aria-label="next"
              sx={{
                height: "40px",
              }}
              onClick={handleNextClick}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="next"
              sx={{
                height: "40px",
              }}
              disabled
            >
              <ArrowForwardIosIcon sx={{ color: "#dedede" }} />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Category;
