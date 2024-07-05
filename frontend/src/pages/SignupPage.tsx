import React from "react";
import host from "../utils/links";
import { Link, useNavigate } from "react-router-dom";
import AuthRedirect from "../utils/AuthRedirect";
import { IFormData, userMessage } from "../utils/types";
import { formatErrors } from "../utils/formatErrors";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  };

  const formFields = [
    { label: "Username", id: "username", type: "text" },
    { label: "First Name", id: "first_name", type: "text" },
    { label: "Last Name", id: "last_name", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Password", id: "password1", type: "password" },
    { label: "Confirm Password", id: "password2", type: "password" },
  ];

  const [formData, setFormData] = React.useState<IFormData>(initialFormData);
  const [hasError, setHasError] = React.useState<userMessage>({
    status: null,
    message: "",
  });

  const submitLoginRequest = async () => {
    setHasError({ status: null, message: "" });

    // Check for empty fields
    if (formData.username === "" || formData.password1 === "") {
      setHasError({
        status: "error",
        message: "One or more required field(s) above is blank",
      });
      return;
    }

    if (
      !(
        formData.email === "" ||
        /^([\w-\.!+%]+@([A-Za-z0-9-]+\.)+[\w-]{2,4})?$/.test(formData.email)
      )
    ) {
      setHasError({ status: "error", message: "Email is invalid" });
      setFormData({ ...formData, password1: "", password2: "" });
      return;
    }

    if (formData.password1.length < 8) {
      setHasError({
        status: "error",
        message: "Password must be at least 8 characters",
      });
      setFormData({ ...formData, password1: "", password2: "" });
      return;
    }

    if (formData.password1 !== formData.password2) {
      setHasError({ status: "error", message: "Passwords didn't match" });
      setFormData({ ...formData, password1: "", password2: "" });
      return;
    }

    const response = await fetch(`${host}/accounts/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password1,
        first_name: formData.first_name,
        last_name: formData.last_name,
      }),
    });

    if (!response.ok) {
      const error = (await response.json()).error;

      setHasError({
        status: "error",
        message: formatErrors(error),
      });
      setFormData({ ...formData, password1: "", password2: "" });
    } else {
      navigate("/login");
    }
  };

  const handleChange = (field: keyof IFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderInputs = () => {
    return formFields.map((field) => (
      <TextField
        key={field.id}
        label={field.label}
        type={field.type}
        id={field.id}
        onChange={(e) => handleChange(field.id as keyof IFormData, e.target.value)}
        value={formData[field.id as keyof IFormData]}
        required={field.id === "username" || field.id === "password1" || field.id === "password2"}
        variant="outlined"
        margin="normal"
        fullWidth
      />
    ));
  };

  return (
    <Container component="main" maxWidth="xs">
      <AuthRedirect redirectPath="/" />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up for Talent Trade:
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Already a member? <Link to="/login">Sign in!</Link>
        </Typography>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); submitLoginRequest(); }} sx={{ mt: 1 }}>
          {renderInputs()}
          {hasError.status === "error" && (
            <Alert severity="error">{hasError.message}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
