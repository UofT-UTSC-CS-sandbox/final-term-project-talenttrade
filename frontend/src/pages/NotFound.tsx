import { Link } from "react-router-dom";
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist. Sorry.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
