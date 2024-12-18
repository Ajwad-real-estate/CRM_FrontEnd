import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Make the POST request to the backend
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        identifier,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Save tokens and user data into cookies
      Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
      Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });

      // Save the user object details into cookies
      Cookies.set('username', user.username, { secure: false });
      Cookies.set('agentId', user.agentId, { secure: false });
      Cookies.set('role', user.role, { secure: false });
      Cookies.set('roleId', user.roleId, { secure: false });

      console.log('User payload saved in cookies:', { ...user });

      // Navigate to the dashboard or home page
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid identifier or password');
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),#4cceac,theme(colors.gray.50),#4cceac,theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>
          {/* Login Form */}
          <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-[#4cceac]/65"
                  htmlFor="identifier"
                >
                  Identifier
                </label>
                <input
                  id="identifier"
                  type="text"
                  className="form-input w-full p-2 rounded"
                  placeholder="Your username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-[#4cceac]/65"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full p-2 rounded"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Display error if any */}
            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="mt-6 space-y-5">
              <button className="btn p-2 rounded w-full bg-gradient-to-t from-[#4cceac] to-[#4cceac] bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#1c1c1c',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: '#4cceac', fontWeight: 'bold' }}
          >
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <Box mb={3}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                InputLabelProps={{
                  style: { color: '#4cceac' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // error={Boolean(errors.email)}
                // helperText={errors.email}
                sx={{
                  '& fieldset': { borderColor: '#4cceac' },
                  '&:hover fieldset': { borderColor: '#4cceac' },
                }}
              />
            </Box>

            {/* Password Input */}
            <Box mb={3}>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                InputLabelProps={{
                  style: { color: '#4cceac' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // error={Boolean(errors.password)}
                // helperText={errors.password}
                sx={{
                  '& fieldset': { borderColor: '#4cceac' },
                  '&:hover fieldset': { borderColor: '#4cceac' },
                }}
              />
            </Box>

            {/* Display Errors */}
            {/* {Object.keys(errors).map(
              (key) =>
                errors[key] && (
                  <Alert key={key} severity="error" sx={{ marginBottom: 2 }}>
                    {errors[key]}
                  </Alert>
                )
            )} */}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#4cceac',
                '&:hover': { backgroundColor: '#3aae94' },
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </section>
  );
};

export default SignIn;
