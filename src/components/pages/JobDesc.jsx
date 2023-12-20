import React from 'react'

const JobDesc = () => {
  return (
    <div className='bg-[#1e1e1e] p-6 rounded-3xl w-72'>
        <form action="">
            <p className='text-white mb-3'>Job Title</p>
            <input type="text" className='bg-[#111111] h-9 w-full mb-3 border-2 border-zinc-500 rounded-lg'/>
            <p className='text-white mb-3'>Job Description</p>
            <input type="text" className='bg-[#111111] h-56 w-full mb-3 border-2 border-zinc-500 rounded-lg'/>
            <div>
            <button className='bg-primary mt-3 py-3 w-full text-center rounded-lg font-bold'>Start  My Interview</button>
        </div>
        </form>
    </div>
  )
}

export default JobDesc