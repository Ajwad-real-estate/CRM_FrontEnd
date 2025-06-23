import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { tokens } from "../../helpers/redux/theme";
const apiUrl = import.meta.env.VITE_API_URL;
import logoBlack from "/assets/logoBlack.png";
import logoWhite from "/assets/logoWihte.png";

const SignIn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [mode, setMode] = useState("light"); // Default mode

  useEffect(() => {
    // Retrieve mode from localStorage
    const savedMode = localStorage.getItem("mode") || "light"; // Default to 'light' if not set
    setMode(savedMode);
  }, []);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = "Identifier is required";
    } else if (formData.identifier.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.identifier)) {
        newErrors.identifier = "Invalid email format";
      }
    } else if (formData.identifier.length < 3) {
      newErrors.identifier = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 1) {
      newErrors.password = "Password must be at least 1 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await axios.post(apiUrl + "/api/auth/login", formData);
      const { accessToken, refreshToken, user } = response.data;

      // Save tokens
      Cookies.set("accessToken", accessToken, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });

      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });

      // Save user data
      const userData = {
        username: user.username,
        agentId: user.agentId,
        role: user.role,
        roleId: user.roleId,
      };

      Object.entries(userData).forEach(([key, value]) => {
        Cookies.set(key, value, { secure: true, sameSite: "Strict" });
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        error.response?.data?.message ||
          "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: colors.primary[400],
        // backgroundColor: "#141B2D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Container maxWidth="sm">
        {/* 141B2D  1F2A40 */}
        <Box
          sx={{
            backgroundColor: colors.columns[100],
            // backgroundColor: "#1F2A40",
            padding: { xs: 3, sm: 6 },
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${colors.primary[400]}`,
          }}>
          {/* Logo */}
          <Box
            sx={{
              textAlign: "center",
              marginBottom: 4,
            }}>
            <img
              src={mode === "dark" ? logoBlack : logoWhite}
              alt="Ajwad Logo"
              style={{
                height: "40px",
                marginBottom: "1rem",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: colors.grey[100],
              // color: colors.NewNav[900],
              fontWeight: 600,
              marginBottom: 4,
            }}>
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                name="identifier"
                variant="outlined"
                label="Email or Username"
                value={formData.identifier}
                onChange={handleChange}
                error={Boolean(errors.identifier)}
                helperText={errors.identifier}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.NewNav[900],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.NewNav[1100],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.NewNav[900],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[100],
                  },
                  "& .MuiInputBase-input": {
                    color: colors.grey[100],
                  },
                }}
              />
            </Box>

            <Box mb={4}>
              <TextField
                fullWidth
                name="password"
                type="password"
                variant="outlined"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.NewNav[900],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.NewNav[900],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.NewNav[900],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[100],
                  },
                  "& .MuiInputBase-input": {
                    color: colors.grey[100],
                  },
                }}
              />
            </Box>

            {apiError && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 3,
                  backgroundColor: colors.redAccent[500],
                  color: "#fff",
                  "& .MuiAlert-icon": {
                    color: "#fff",
                  },
                }}>
                {apiError}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: colors.NewNav[900],
                color: "#fff",
                padding: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: colors.NewNav[1100],
                },
                "&:disabled": {
                  backgroundColor: colors.NewNav[1100],
                },
              }}>
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
