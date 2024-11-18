import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface SignupFormData {
    name: string;
    email: string;
    password?: string;
  }

function Signupform() {
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
      });
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        
        setFormData(prevState => ({
          ...prevState,
            [name]: value,


        }));
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await sendFormDataToBackend(formData);
          const {jwt} = response.data;
          localStorage.setItem('jwt', jwt);
            // Redirect to the blog page
            navigate('/blogs');

         
        } catch (error) {
          console.error('Signup failed:', error);
          // Handle error (e.g., show error message)
          setError('signup failed. Please try again');
        }
      };


      const sendFormDataToBackend = async (data: SignupFormData) => {
       
        return await axios.post('http://localhost:8787/api/v1/user/signup', data, {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        );
      };

    

    
  return (
    
        <div className="bg-white py-8 px-4 shadow-lg mt-5 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="john@gmail.com"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="hello123"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Sign up
              </button>
            </div>
          </form>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>

   
  )
}

export default Signupform
