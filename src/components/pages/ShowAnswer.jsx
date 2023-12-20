import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Question from '../data/question.json'
import Sidebar from './Sidebar'
import { ChevronLeftIcon } from 'lucide-react'


const ShowAnswer = () => {
    const { question } = useParams();
    const que = Question.data.find((card) => card.question === decodeURIComponent(question));
    const navigate = useNavigate()
    const goBack = ()=>{
        navigate("/common-question")
    }
  return (
    <>
        <div className='flex bg-background'>
            <Sidebar/>
            <div className='flex flex-col w-full p-4'>
                <div>
                    <button onClick={goBack} className="flex justify-center w-fit items-center text-white bg-neutral-800 rounded-lg px-3 py-2">
                        <ChevronLeftIcon strokeWidth={2} size={20} />
                        <p className='pr-2'>Back</p>
                    </button>
                </div>
                <div className='flex gap-2 mt-3'>
                    <div className='flex'>
                        <h1 className='flex justify-start items-center text-neutral-400 text-xl w-fit h-fit px-3 py-2 rounded-full bg-neutral-800'>Q.</h1>
                        <div className='flex flex-col gap-2 ml-2'>
                            <h1 className='text-gray-200 text-3xl'>{que.question}</h1>
                            <div className='flex gap-2'>
                                {que.tags.map((tag)=>(
                                    <p className='bg-emerald-900 w-fit text-emerald-200 rounded-md px-2 py-1 flex items-center justify-center'>{tag}</p>
                                ))}
                            </div>
                            <h2 className='text-primary text-lg'>Best answer for the question are...</h2>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-3 mt-4'>
                    {que.answer.map((ans,index)=>(
                        <div key={index} className='flex gap-2'>
                            <p className='flex justify-start items-center text-neutral-400 text-xl w-fit h-fit px-3 py-2 rounded-full bg-neutral-800'>A.</p>
                            <div className='bg-darkBackground p-2 text-gray-300 hover:border-white/50 border-2 border-primaryGray hover:transition-colors text-2xl w-full h-full rounded-lg'>
                                <p>{ans}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default ShowAnswer