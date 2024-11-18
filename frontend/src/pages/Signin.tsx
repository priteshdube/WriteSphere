import React from 'react'
import Signinform from "../components/Signinform" 
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className='flex flex-col items-center font-medium mt-10'>
    <div className='text-2xl mt-7'>Sign in</div>
    <div>
      <Signinform />
    </div>

    <div className=' mt-7 text-lg'>
      Not have an account? 

      <Link to={'/signup'} >
      <button className=" border-transparent rounded-md shadow-sm text-lg text-white bg-indigo-600 hover:bg-indigo-700 ml-4 px-2   ">
        Sign up
     </button>
      </Link>
    </div>
    
    </div>
  )
}

export default Signin
