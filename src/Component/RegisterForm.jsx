import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Books from "./Books";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [openBook, setOpenBook] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem("registerFormData");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      setFormData(parsedFormData);
      validateForm(parsedFormData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    localStorage.setItem("registerFormData", JSON.stringify(newFormData));

    validateForm(newFormData);
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (data.name.length < 3 || data.name.length > 30) {
      newErrors.name = "Name must be between 3 and 30 characters.";
    }

    if (!data.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }

    if (
      data.password.length < 10 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/g.test(
        data.password
      )
    ) {
      newErrors.password =
        "Password must be at least 10 characters and include a special character.";
    }

    if (data.password !== data.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      alert("Form submitted successfully!");
      setOpenBook(true);
      localStorage.removeItem("registerFormData");
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  if (openBook) {
    return <Books />;
  }
  return (
    <div className="flex ">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <Typography sx={{ color: "rgb(216, 0, 0)" }}>
            <strong> CREATE ACCOUNT</strong>
          </Typography>
          <TextField
            label="Your Name"
            margin="normal"
            variant="outlined"
            sx={{
              minWidth: "20rem",
            }}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Your Email"
            margin="normal"
            variant="outlined"
            sx={{ minWidth: "20rem" }}
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            margin="normal"
            variant="outlined"
            sx={{ minWidth: "20rem" }}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Repeat Your Password"
            margin="normal"
            variant="outlined"
            sx={{ minWidth: "20rem" }}
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword}
          />
          <Button
            variant="outlined"
            type="submit"
            disabled={isSubmitDisabled}
            sx={{
              minWidth: "20rem",
              color: "white",
              bgcolor: "rgb(197, 119, 119)",
              border: "3px solid rgb(216, 0, 0)",
              borderRadius: "0.25rem",
              "&:hover": {
                bgcolor: "rgb(216, 0, 0)",
                border: "3px solid rgb(197, 119, 119)",
              },
            }}
          >
            SIGN UP
          </Button>
          <Typography variant="body2" align="center" marginTop="1em">
            Have already an account? <strong>Login here</strong>
          </Typography>
        </form>
      </Box>
    </div>
  );
}

export default RegisterForm;
