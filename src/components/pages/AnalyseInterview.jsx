import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const AnalyseInterview = () => {
    const token = Cookies.get('token');
    const [allInterviewData, setAllInterviewData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://prep-me-up.onrender.com/fetchinterview', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllInterviewData(response.data.info);
                console.log(response.data.info);
            } catch (error) {
                console.error('Error fetching interview data:', error);
            }
        };

        fetchData();
    }, []);
    
  return (
    <>
        <div className='flex gap-2 bg-background'>
            <Sidebar/>
            <div className='w-full p-2'>
                <p className='text-3xl text-white'>Your Interviews</p>
                <table className="w-full text-sm text-left mt-4 rtl:text-right text-white">
                    <thead className="text-xs text-white uppercase bg-primaryGray ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Job Profile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Glimse
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allInterviewData.map((ele, index)=>(
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-6 py-4">
                                        {index + 1}.
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {ele.conversation[0].message.split(" ").slice(3,5).join(" ")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ele.conversation[0].message.split(" ").slice(0,10).join(" ")}...
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/analyse-interview/${ele._id}`} className="font-medium text-primary hover:underline">Analyse</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default AnalyseInterview