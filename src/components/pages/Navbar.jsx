import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-darkBackground flex h-fit px-4 sm:px-8 py-3 justify-between items-center'>
        <div>
            <Link to={`/`} className='font-changa font-bold sm text-white text-xl'>Prep Me Up</Link>
        </div>
        <div className='flex gap-3 sm:gap-6'>
            <Link className='bg-transparent border-2 border-primary sm:px-6 px-4 py-2 rounded-lg text-primary cursor-pointer font-semibold' to={`/login`}>Login</Link>
            <Link className='bg-primary border-2 border-primary sm:px-6 px-4 py-2 rounded-lg text-black cursor-pointer font-semibold' to={`/register`}>Signup</Link>
        </div>
    </nav>
  )
}

export default Navbar