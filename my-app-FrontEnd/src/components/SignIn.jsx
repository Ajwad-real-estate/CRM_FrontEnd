import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation after login
import axios from 'axios';
import { Link } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;
const websiteUrl = import.meta.env.VITE_APP_WEBSITE_URL;
export default function SignIn() {
  console.log(apiUrl); // https://api.example.com
  
  console.log(websiteUrl); // https://www.example.com
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate after successful login

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make sure both fields are filled
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Make the POST request to the backend
      const response = await axios.post('/api/auth/login', { email, password });

      // If successful, you can store the token and redirect the user
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);  // Store token in local storage (for example)
        navigate('/dashboard');  // Redirect user to the dashboard (or another page)
      }
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError('Invalid email or password');
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
                <label className="mb-1 block text-sm font-medium text-[#4cceac]/65" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full p-2 rounded"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#4cceac]/65" htmlFor="password">
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
              <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              <button className="btn p-2 rounded relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Sign In with Google
              </button>
            </div>
          </form>
          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-[#4cceac]/65">
            Don't you have an account?{" "}
            <Link className="font-medium text-[#4cceac]" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
