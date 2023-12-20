import React from 'react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'

const Card = ({question, tags}) => {
  
  return (
    <div className='bg-primaryGray w-max-fit h-full p-4 min-h-[32px] rounded-lg border-primaryGray border-2 hover:border-primary/60 hover-white cursor-pointer shadow-sm'>
        <div className='flex gap-2'>
            <div className='text-white w-8 h-8 bg-neutral-800 flex items-center justify-center rounded-full'><QuestionMarkIcon/></div>
            {tags.map((tag)=>(
              <div className='bg-emerald-900 text-emerald-200 rounded-md px-2 flex items-center justify-center'>{tag}</div>
            ))}
        </div>
        <div>
            <p className='text-gray-300 mt-2 text-2xl'>{question}</p>
        </div>
    </div>
  )
}

export default Card