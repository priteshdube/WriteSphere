import React from 'react';
import Signinform from "../components/Signinform"; 
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-indigo-50 to-white min-h-screen flex flex-col items-center justify-center py-6">
      {/* Title Section */}
      <div className="text-4xl font-extrabold text-gray-900 mb-6">Log In</div>


      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Signinform />
      </div>

      {/* Sign-up Link */}
      <div className="mt-6 text-lg text-gray-700">
        Already have an account?{' '}
        <Link to={'/signup'}>
          <button className="mt-2 text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-6 py-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
