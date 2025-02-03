import { useState } from 'react';
import users from '../data/user.json'; 
import loginsvg from '../assets/images/login-svg.svg'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username);
    if (user) {
      if (user.password === password && user.username === username) {
        toast.success('Login successful', { autoClose: 1000 });
        console.log(user);        
        navigate('/booklist');
      } else {
        toast.error('Invalid username or password', { autoClose: 1000 });
        navigate('/login');
      }
    }
    else {
      toast.error('Invalid username or password', { autoClose: 1000 });
      navigate('/login');
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-green-200">
        <div className="login-form w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 flex flex-col md:flex-row">
          {/* Left Image Section */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-r from-green-400 to-green-700 rounded-l-xl">
            <img
              src={loginsvg}
              alt="Login illustration"
              className="w-3/4 h-auto"
            />
          </div>

          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
              Welcome Back
            </h1>
            <p className="text-gray-500 mb-6 text-center">
              Please login to access your account
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Login
              </button>
            </form>

            <p className="text-gray-500 text-center mt-6">
              Don't have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
