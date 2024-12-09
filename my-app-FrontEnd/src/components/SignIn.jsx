import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Backend API URL
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
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
console.log(response)
      const { accessToken, refreshToken, role_id, name } = response.data;
      console.log(response.data)
      // Save tokens in cookies
      Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
      Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
      Cookies.set('role_id', role_id, { secure: false });
      Cookies.set('name', name, { secure: false });

      // Decode the name if needed
      const decodedName = decodeURIComponent(Cookies.get('name'));

      // You can now use the decoded name
      console.log(decodedName); // "ahmed name"

      // Navigate to the dashboard
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
          {/* Contact form */}
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
          {/* Bottom link
          <div className="mt-6 text-center text-sm text-[#4cceac]/65">
            Don't you have an account?{' '}
            <Link className="font-medium text-[#4cceac]" to="/signup">
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
