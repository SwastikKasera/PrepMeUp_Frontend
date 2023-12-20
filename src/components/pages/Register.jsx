import React, {useState} from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import bkgImage from './assets/grid.svg'
import { Link } from 'react-router-dom'
const backgroundStyle = {
    backgroundImage: `url(${bkgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    
}

const Register = () => {
    const [registerDetails, setregisterDetails] = useState({
        "username":"",
        "email":"",
        "phoneNumber":"",
        "password":""
    })
    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        const loginResponse = await axios.post('https://prep-me-up.onrender.com/register', registerDetails,{
            headers:{
                "Content-Type": "application/json"
            }
        })
        console.log(loginResponse);
        if(loginResponse.statusText.toLowerCase() === 'ok'){
            toast.success("User successfully regisitered")
            return
        }
        return toast.error("Fail to register user")
    }
    const handleInputChange = (e)=>{
        const {name, value} = e.target
        
        setregisterDetails((prevDetail) => ({
            ...prevDetail,
            [name]:value
        }))
        console.log(registerDetails);
    }
  return (
    <>
        <div style={backgroundStyle} className='bg-[#1e1e1e] w-[100vw] h-[100vh] flex items-center justify-center'>
            <form onSubmit={handleFormSubmit}>
            <div className='bg-[#181818] p-8 border-[#454545] border-2 rounded-3xl flex flex-col justify-center items-center gap-4'>
                <div className='w-full text-white text-3xl flex justify-center'>
                    <h1>Register</h1>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#efefef]'>Username</p>
                        <input onChange={handleInputChange} name='username' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#efefef] border-2 rounded-lg p-2 w-full focus:outline-none' type="text" />
                    </div>
                    <div className='w-full'>
                        <p className='text-[#efefef]'>Email</p>
                        <input onChange={handleInputChange} name='email' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#efefef] border-2 rounded-lg p-2 w-full focus:outline-none' type="email" />
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#eeeeee]'>Phone No.</p>
                        <input onChange={handleInputChange} name='phoneNumber' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#eeeeee] border-2 rounded-lg p-2 w-full focus:outline-none' type="tel" />
                    </div>
                    <div className='w-full'>
                        <p className='text-[#eeeeee]'>Password</p>
                        <input onChange={handleInputChange} name='password' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#eeeeee] border-2 rounded-lg p-2 w-full focus:outline-none' type="password" />
                    </div>
                </div>
                <div className='w-full mt-2'>
                    <button className='bg-primary py-2 w-full text-center rounded-lg text-neutral-950 font-bold' type='submit'>Register</button>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <hr className='w-32 border-t-2 border-neutral-600' />
                    <p className='text-[#eeeeee] text-base'>Or</p>
                    <hr className='w-32 border-t-2 border-neutral-600' />
                </div>
                <div className='w-full'>
                    <button className='bg-[#181818] mt-2 b-2 border-[#454545] text-[#eeeeee] text-base border-2 rounded-lg p-2 w-full'>Sign up with Google</button>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <p className='text-[#eeeeee]'>Already have an account? <span className='text-primary hover:underline hover:cursor-pointer'><Link to="/login" >Login Here</Link></span></p>
                </div>
            </div>
            </form>
        </div>
        <Toaster/>
    </>
  )
}
export default Register