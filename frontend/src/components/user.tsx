import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardActionArea, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Rating from "@mui/material/Rating";

export interface UserType {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  let value = 2;
  let numRatings = 3;

  return (
    <Card
      sx={{
        width: 200,
      }}
    >
      <CardActionArea>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%", minHeight: 250 }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop="15px"
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: "50%",
                height: "auto",
                aspectRatio: "1",
                fontSize: "1.5rem",
              }}
              alt={user.first_name}
              src="/broken-image.jpg"
            />
          </Grid>
          <Grid
            container
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardContent
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography
                noWrap
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  paddingBottom: "10px",
                }}
              >
                {`@${user.username}`}
              </Typography>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  value={value}
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "#FFD700",
                    },
                  }}
                />
                <Box>{`(${numRatings})`}</Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default User;
