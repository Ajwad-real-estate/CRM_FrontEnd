import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import add from "../../assets/add.mp3";
import delet from "../../assets/delet.mp3";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
  name: "",
  email: "",
  contact: "",
  roleId: "", // Added roleId
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  roleId: yup.string().required("Role ID is required"), // Added roleId validation
});

const apiUrl = import.meta.env.VITE_API_URL;

const CreateAccForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [addSound, setAddSound] = useState(false);
  const [dltSound, setDltSound] = useState(false);

  useEffect(() => {
    const playSound = () => {
      if (addSound) {
        const sound = new Audio(add);
        sound.play();
      } else if (dltSound) {
        const sound = new Audio(delet);
        sound.play();
      }
      setAddSound(false);
      setDltSound(false);
    };

    playSound();
  }, [addSound, dltSound]);

  const handleFormSubmit = async (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      contact: values.contact,
      roleId: values.roleId, // Send roleId
    };
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await fetch(apiUrl + "/api/create-sales-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(userData),
      });

      // Check if the response is Unauthorized (401)
      if (response.status === 401) {
        // Show toast notification for Unauthorized
        toast.error("Unauthorized. Please logout and login again.", {
          toastId: "unauthorized-toast", // Prevent duplicate toasts
          position: "top-center", // Position the toast notification
          autoClose: 5000, // Automatically close after 5 seconds
        });
        setDltSound(true); // Play error sound
        return; // Stop further execution
      }

      // Parse the response JSON
      const result = await response.json();

      if (response.ok) {
        // Show success notification
        toast.success("Account created successfully!", {
          toastId: "success-toast",
          position: "top-center",
          autoClose: 5000,
        });
        setAddSound(true); // Play success sound
      } else {
        // Show toast for other API errors
        toast.error(`Error: ${result.message}`, {
          toastId: "api-error-toast",
          position: "top-center",
          autoClose: 5000,
        });
        setDltSound(true); // Play error sound
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        toastId: "unexpected-error-toast",
        position: "top-center",
        autoClose: 5000,
      });
      setDltSound(true); // Play error sound
    }
  };


  return (
    <Box m="20px">
      {/* <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          marginTop: "100px", // Moves the toaster 50px down
          margin: "8px"
        }}
        toastOptions={{
          success: {
            duration: 3350,
          },
          error: {
            duration: 5870,
          },
          style: {
            fontSize: "17px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      /> */}
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleId}
                name="roleId"
                error={!!touched.roleId && !!errors.roleId}
                helperText={touched.roleId && errors.roleId}
                sx={{ gridColumn: "span 4" }}
              /> */}
              <FormControl fullWidth variant="filled">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="roleId"
                  value={values.roleId}
                  onChange={handleChange}
                  label="Role ID"
                  name="roleId"
                >

                  <MenuItem value="2">Admin</MenuItem>
                  <MenuItem value="3">User</MenuItem>
                  {/* Add other roles as necessary */}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


export default CreateAccForm;
