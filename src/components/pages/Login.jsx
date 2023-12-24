import React, {useState} from 'react'
import bkgImage from './assets/grid.svg'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
const backgroundStyle = {
    backgroundImage: `url(${bkgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    
}
const Login = () => {
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        "phoneNumber":"",
        "password":""
    })
    const loginUser = async () => {
        return axios.post('https://prep-me-up.onrender.com/login', loginDetails, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
      };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        toast.promise(loginUser(),
          {
            loading: 'Logging in...',
            success: (loginResponse) => {
                if (loginResponse.status === 200) {
                    Cookies.set('token', loginResponse.data.token);
                    navigate('/common-question');
                    return 'User Login Success';
                }
            },
            error: (loginResponse)=>{
                return loginResponse.response.data.message
            }
          }
        );
      };
    const handleInputChange = (e)=>{
        const {name, value} = e.target
        
        setLoginDetails((prevDetail) => ({
            ...prevDetail,
            [name]:value
        }))
        // console.log(loginDetails);
    }
  return (
    <>
        <div style={backgroundStyle} className='bg-[#1e1e1e] w-[100vw] h-[100vh] flex items-center justify-center'>
            {/* <div className='absolute w-full h-full bg-black'></div> */}
            <form onSubmit={handleFormSubmit}>
            <div className='bg-[#181818] w-96 p-8 border-[#454545] border-2 rounded-3xl flex flex-col justify-center items-center gap-4'>
                <div className='w-full text-white text-3xl flex justify-center'>
                    <h1>Login</h1>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#efefef]'>Phone No</p>
                        <input onChange={handleInputChange} name='phoneNumber' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#efefef] border-2 rounded-lg p-2 w-full focus:outline-none' type="text" />
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <p className='text-[#eeeeee]'>Password</p>
                        <input onChange={handleInputChange} name='password' className='bg-[#181818] mt-3 b-2 border-[#454545] text-[#eeeeee] border-2 rounded-lg p-2 w-full focus:outline-none' type="password" />
                    </div>
                </div>
                <div className='w-full mt-2'>
                    <button className='bg-primary py-2 w-full text-center rounded-lg text-neutral-950 font-bold' type='submit'>Login</button>
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
                    <p className='text-[#eeeeee]'>Already have an account? <span className='text-primary hover:underline hover:cursor-pointer'><Link to="/register">Register Here</Link></span></p>
                </div>
            </div>
            </form>
        </div>
        <Toaster/>
    </>
  )
}

export default Login