import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import '../../App.css'
import Heroimg from './assets/Heroimg.png'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div id='herosection' className='flex lg:flex-row flex-col-reverse items-start lg:items-center md:justify-around justify-evenly bg-background w-full h-screen'>
          <div className='flex flex-col items-center justify-center md:ml-10 gap-2 lg:w-1/2 md:p-4 p-3'>
            <div className='w-full'>
              <div className='w-full'>
                <h1  className='text-primary text-5xl lg:text-left text-center underline'>Master Your Interview</h1>
              </div>
              <div className='mt-3'>
                <h1 className='text-slate-300 text-4xl lg:text-left text-center'>Practice Mock Interview with Artificial Intelligence</h1>
              </div>
            </div>
            <div className='w-full flex md:flex-row flex-col items-center lg:justify-start justify-center gap-2 mt-6'>
              <div>
                <Link to={`/login`} className='bg-primary px-6 py-3 rounded-lg font-semibold'>Start Here</Link>
              </div>
              <div className='p-2'>
                  <p className='text-white text-lg'>Try Now - <span className='text-primary underline font-semibold underline-offset-8'>Its Free</span></p>
              </div>
            </div>
          </div>
          <div className='p-2 lg:w-1/2 flex items-center justify-center'>
            <img src={Heroimg} className='w-8/12 lg:w-10/12 lg:ml-16' alt="" />
          </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home