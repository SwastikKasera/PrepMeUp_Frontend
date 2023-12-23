import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='w-full h-10 py-2 bg-darkBackground flex items-center justify-center'>
        <h2 className='text-white font-bold'>Designed & Developed By <Link to={`https://github.com/SwastikKasera`} className='text-primary hover:underline'>Swastik Kasera</Link></h2>
    </div>
    </>
  )
}

export default Footer