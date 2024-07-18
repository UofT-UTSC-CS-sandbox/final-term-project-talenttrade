import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { SwitchProps } from "@mui/material/Switch";
import {
  Avatar,
  Button,
  ButtonProps,
  InputAdornment,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../utils/requestHandler";
import { useAuth } from "../utils/AuthService";
import { UserProfileType } from "../pages/ViewProfile";

//help with styling from: https://mui.com/material-ui/react-app-bar/

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: 0,
  borderRadius: 30,
  backgroundColor: "#f4f4f4",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "40%",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove the border
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1.5),
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 105,
  height: 34,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(50px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#fff",
        opacity: 1,
        border: 0,
        "&:before": {
          color: "#969696",
          fontWeight: "normal",
        },
        "&:after": {
          color: "black",
        },
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&:not(.Mui-checked) + .MuiSwitch-track": {
      "&:before": {
        color: "black",
      },
      "&:after": {
        color: "#969696",
        fontWeight: "normal",
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 50,
    height: 32,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  "& .MuiSwitch-track": {
    borderRadius: 30,
    backgroundColor: "#fff",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    position: "relative",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 16,
      color: "black",
    },
    "&:before": {
      content: '"Need"',
      left: 8,
      transition: "color 300ms",
    },
    "&:after": {
      content: '"User"',
      right: 8,
      transition: "color 300ms",
    },
  },
}));

const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#000000",
  border: 0,
  "&:hover": {
    backgroundColor: "#424242",
    border: 0,
  },
}));

const PostButton = styled(Button)<ButtonProps>(() => ({
  color: "#000000",
  borderColor: "#000000",
  "&:hover": {
    borderColor: "#424242",
    backgroundColor: "#f4f4f4",
  },
}));

const SignUpButton = styled(Button)<ButtonProps>(() => ({
  color: "#000000",
  backgroundColor: "#f4f4f4",
  border: 0,
  "&:hover": {
    border: 0,
    backgroundColor: "#e3e3e3",
  },
}));

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

interface TopBarProps {
  onSearchFocusChange: (focused: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearchFocusChange }) => {
  const navigate = useNavigate();
  const apiFetch = useRequest();
  const [selectedValue, setSelectedValue] = useState("Need");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const { refreshToken } = useAuth();
  const [loggedIn, setLoggedIn] = useState<Boolean>();

  const { logOut } = useAuth();

  const logoutFunction = async () => {
    setAnchorElUser(null);
    const sucess = await logOut();
    console.log(sucess);
    if (sucess! === true) {
      setLoggedIn(false);
      navigate("/login");
    } else {
      alert(sucess);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      const getLoggedInStatus = async () => {
        try {
          const loggedIn = await refreshToken();
          setLoggedIn(loggedIn);
          console.log("User logged in:", loggedIn);
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      };

      getLoggedInStatus();
    }
  }, [refreshToken]);

  useEffect(() => {
    if (loggedIn == true) {
      getProfile();
    }
  }, [loggedIn]);

  const getProfile = async () => {
    const response = await apiFetch(`accounts/profile/`, { method: "GET" });
    setProfile(response);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  const handleSwitch = (_event: React.ChangeEvent<HTMLInputElement>): void => {
    if (selectedValue == "Need") {
      setSelectedValue("User");
    } else {
      setSelectedValue("Need");
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleListings = () => {
    navigate("/MyListings");
  };

  const handleLogout = () => {
    logoutFunction();
    navigate("/login");
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const navigateCreate = () => {
    navigate("/CreatePost", { state: { create: true } });
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput && selectedValue == "Need") {
      navigate(`/view-posts-by-category?need=${searchInput}&show=${true}`);
    } else if (searchInput && selectedValue == "User") {
      navigate(`/search-users?username=${searchInput}`);
    }
  };

  const handleSearchFocus = (focused: boolean) => {
    onSearchFocusChange(focused);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          height: "100px",
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, paddingLeft: 5 }}
          >
            <Link
              to="/"
              className="link"
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bolder",
                fontSize: "1.8rem",
              }}
            >
              TalentTrade
            </Link>
          </Typography>

          <Search>
            <form role="search" id="form" onSubmit={handleSubmit}>
              <CustomTextField
                variant="outlined"
                type="search"
                placeholder="search"
                onChange={handleChange}
                onFocus={() => handleSearchFocus(true)}
                onBlur={() => handleSearchFocus(false)}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IOSSwitch onChange={handleSwitch} sx={{ m: 1 }} />
                      <SearchIcon
                        sx={{
                          borderLeft: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchButton
                        variant="contained"
                        disableElevation
                        type="submit"
                        sx={{
                          borderRadius: 30,
                        }}
                      >
                        Search
                      </SearchButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Search>
          <PostButton
            variant="outlined"
            disableElevation
            sx={{
              borderRadius: 30,
            }}
            onClick={navigateCreate}
          >
            Make A Post
          </PostButton>
          {loggedIn ? (
            <Box sx={{ flexGrow: 0, paddingRight: 5 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={profile?.full_name}
                    src={profile?.profile_picture}
                    sx={{
                      backgroundColor: stringToColor(profile?.full_name || ""),
                      fontSize: "1rem",
                    }}
                  >
                    {profile?.full_name.split(" ")[0][0]}
                    {profile?.full_name.split(" ")[1][0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"Profile"} onClick={handleProfile}>
                  <Typography textAlign="center">{"My Profile"}</Typography>
                </MenuItem>
                <MenuItem key={"Listings"} onClick={handleListings}>
                  <Typography textAlign="center">{"My Listings"}</Typography>
                </MenuItem>
                <MenuItem key={"Logout"} onClick={handleLogout}>
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <SignUpButton
              variant="outlined"
              disableElevation
              sx={{
                borderRadius: 30,
                marginRight: 5,
              }}
              onClick={navigateLogin}
            >
              Log in
            </SignUpButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
