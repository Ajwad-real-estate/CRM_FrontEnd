import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/topBar/Header";
import toast from "react-hot-toast";
import add from "../../../public/assets/add.mp3";
import delet from "../../../public/assets/delet.mp3";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Phone number regex pattern
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Initial form values (phoneNumbers is now an array)
const initialValues = {
  name: "",
  username: "",
  password: "",
  email: "",
  roleId: "",
  cityId: "",
  street: "",
  manager_id: Cookies.get("agentId"),
  phoneNumbers: [""], // Initialize with an empty phone number field
};

// Validation schema (adjusted for phoneNumbers array)
const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("password is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  roleId: yup.string().required("Role is required"),
  cityId: yup.string().required("City is required"), // Add city validation
  street: yup.string().required("Street is required"), // Add street validation
  phoneNumbers: yup
    .array()
    .of(yup.string().matches(phoneRegExp, "Phone number is not valid"))
    .required("At least one phone number is required"),
});

const apiUrl = import.meta.env.VITE_API_URL;

const CreateAccForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false); // State to manage loading status

  // State variables for sound effects and roles
  const [addSound, setAddSound] = useState(false);
  const [dltSound, setDltSound] = useState(false);
  const [roles, setRoles] = useState([]); // To hold roles from API
  const [cities, setCities] = useState([]);
  // Fetch roles from the server on component mount
  useEffect(() => {
    // fetchCities
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/city`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        const { data } = response;

        if (data && data.cities && data.cities.length > 0) {
          const fetchedCities = data.cities.map((city) => city.name);

          // Merge fetched cities with fallback cities, avoiding duplicates
          // const mergedCities = Array.from(new Set([...fetchedCities, ...cityOptions]));

          // Sort the cities alphabetically
          // mergedCities.sort((a, b) => a.localeCompare(b));

          setCities(fetchedCities);
        }
      } catch (err) {
        console.error("Error fetching cities:", err.message);
        // setError("Failed to fetch cities. Using fallback options.");

        // Use fallback cities in case of error
        // setCities(cityOptions);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchCities();
    const fetchRoles = async () => {
      const accessToken = Cookies.get("accessToken");
      try {
        const response = await fetch(`${apiUrl}/api/roles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Send access token for authorization
          },
        });

        if (response.ok) {
          const result = await response.json();
          setRoles(result.roles); // Set roles if the request is successful
        } else {
          toast.error("Failed to load roles.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("An error occurred while fetching roles.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    fetchRoles();
  }, []);

  // Play sound effect when addSound or dltSound is triggered
  useEffect(() => {
    const playSound = () => {
      if (addSound) {
        new Audio(add).play();
      } else if (dltSound) {
        new Audio(delet).play();
      }
      setAddSound(false);
      setDltSound(false);
    };

    playSound();
  }, [addSound, dltSound]);

  // Handle form submission
  const handleFormSubmit = async (values) => {
    console.log("Form values:", values); // Log values to check if they're correct

    const userData = {
      username: values.name,
      name: values.name,
      email: values.email,
      password: values.password,
      //    manager_id: va,
      roleId: values.roleId, // Send roleId
      cityId: values.cityId, // Send cityId
      street: values.street, // Send street
      phoneNumbers: values.phoneNumbers, // Send phone numbers as an array
    };
    setLoading(true); // Set loading to true while waiting for response

    const accessToken = Cookies.get("accessToken");

    try {
      const response = await fetch(`${apiUrl}/api/create-sales-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Add the token for authorization
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 401) {
        toast.error("Unauthorized. Please logout and login again.", {
          position: "top-center",
          autoClose: 5000,
        });
        setDltSound(true); // Play error sound
        setLoading(false); // Set loading to true while waiting for response

        return;
      }

      const result = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 5000,
        });
        setAddSound(true); // Play success sound
      } else {
        toast.error(`Error: ${result.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
        setDltSound(true); // Play error sound
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
      setDltSound(true); // Play error sound
    } finally {
      setLoading(false); // Set loading to true while waiting for response
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          console.log(errors); // Log errors for debugging

          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  variant="filled"
                  label="Name"
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
                  label="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.street}
                  name="street"
                  error={!!touched.street && !!errors.street}
                  helperText={touched.street && errors.street}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                {/* Phone Numbers Field */}
                {values.phoneNumbers.map((phoneNumber, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    variant="filled"
                    label={`Phone Number ${index + 1}`}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const updatedPhones = [...values.phoneNumbers];
                      updatedPhones[index] = e.target.value;
                      setFieldValue("phoneNumbers", updatedPhones);
                    }}
                    value={phoneNumber}
                    name={`phoneNumbers[${index}]`}
                    error={
                      !!touched.phoneNumbers && !!errors.phoneNumbers?.[index]
                    }
                    helperText={
                      touched.phoneNumbers && errors.phoneNumbers?.[index]
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                ))}

                {/* Add Button to add phone number */}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setFieldValue("phoneNumbers", [...values.phoneNumbers, ""]);
                  }}
                  sx={{ gridColumn: "span 4" }}>
                  Add Phone Number
                </Button>

                {/* Role Selection */}
                <FormControl fullWidth variant="filled">
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={values.roleId}
                    onChange={handleChange}
                    label="Role ID"
                    name="roleId">
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* city Selection */}
                <FormControl fullWidth variant="filled">
                  <InputLabel id="city-select-label">city</InputLabel>
                  <Select
                    labelId="city-select-label"
                    value={values.cityId}
                    onChange={handleChange}
                    label="city ID"
                    name="cityId">
                    {/* {cities.map((cities) => (
           <MenuItem key={cities.id} value={cities.id}>
            {cities.title}
           </MenuItem>
          ))} */}
                    {cities.map((city, index) => (
                      <MenuItem key={city} value={index}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={loading}>
                  {loading ? "Creating User..." : "Create New User"}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateAccForm;
