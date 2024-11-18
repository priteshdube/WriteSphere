import React,{useState} from 'react'
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
        password: ''
    });
    
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try{
        const response= await axios.post('http://localhost:8787/api/v1/user/signin', signininput);
        const {jwt} = response.data;
        localStorage.setItem('jwt', jwt);
        navigate('/blogs');
    }
    catch (error:any){
       setError(error.response?.data?.error || 'An error occurred during sign in')
    }
        
    }
    
  return (
    <div className="flex items-center justify-center bg-gray-100 mt-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        

            <LabelInput 
                label="Email" 
                name="email" 
                placeholder="john@gmail.com" 
                id="email" 
                onChange={(e) => setSignininput({ ...signininput, email: e.target.value })}
            />
            <LabelInput 
                label="Password" 
                name="password" 
                placeholder="hello123" 
                id='password'
                onChange={(e) => setSignininput({ ...signininput, password: e.target.value })}
            />

            <button
                onClick={handleSignIn}
                className="w-full  bg-indigo-600 hover:bg-indigo-700  text-white py-2 rounded-md transition duration-200"
            >
                Sign In
            </button>

            {error && <div style={{ color: 'red', marginTop: '10px'  }}>{error}</div>}
        </div>
        
  </div>
  )
}


const LabelInput: React.FC<SigninformProps> = ({ label, name, placeholder, id, onChange}) => {
    return (
        <div className="mb-4">
        <label 
          htmlFor={name} 
          className="block text-gray-700 text-sm mb-2"
        >
          {label}
        </label>
        <input
        type={name === 'password' ? 'password' : 'email'} // Conditional type
        id={id}
        name={name}
        required
        placeholder={placeholder}
        className="border border-gray-300 rounded-md w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
        />
      </div>
    );
  };

export default Signinform
