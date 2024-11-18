import React from 'react'
import Signupform from '../components/Signupform'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='flex flex-col items-center font-medium mt-10'>
      <div className='text-2xl mt-7'>Sign up</div>
      <div>
        <Signupform />
      </div>

      <div className=' mt-7 text-lg'>
        Already have an account? 

        <Link to={'/signin'} >
        <button className=" border-transparent rounded-md shadow-sm text-lg text-white bg-indigo-600 hover:bg-indigo-700 ml-4 px-2   ">
          Sign in
    </button>
        </Link>
      </div>
      
      </div>
   

  )
}

export default Signup
