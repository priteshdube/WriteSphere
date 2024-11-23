import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SigninformProps {
  label: string;
  name: string;
  placeholder: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Signinform = () => {
  const [signininput, setSignininput] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await axios.post('https://backend.mailforpritesh.workers.dev/api/v1/user/signin', signininput);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.error || 'An error occurred during sign in');
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center px-4 py-6">
      {/* Title Section */}
      <div className="text-4xl font-extrabold text-gray-900 mb-6 text-center"></div>

      {/* Signin Form */}
      <div className="w-full max-w-md bg-white py-8 px-6 rounded-lg shadow-md">
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Email Input */}
          <LabelInput
            label="Email"
            name="email"
            placeholder="john@gmail.com"
            id="email"
            onChange={(e) => setSignininput({ ...signininput, email: e.target.value })}
          />

          {/* Password Input */}
          <LabelInput
            label="Password"
            name="password"
            placeholder="hello123"
            id="password"
            onChange={(e) => setSignininput({ ...signininput, password: e.target.value })}
          />

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

const LabelInput: React.FC<SigninformProps> = ({ label, name, placeholder, id, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={name === 'password' ? 'password' : 'email'}
          id={id}
          name={name}
          required
          placeholder={placeholder}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Signinform;
