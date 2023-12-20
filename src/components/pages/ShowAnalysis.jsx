import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar';
import { AlertTriangle, FileDigit, Languages, Rocket, Speech, Target, Workflow } from 'lucide-react';
import { useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const ShowAnalysis = () => {
  const { id } = useParams();
  const token = Cookies.get('token');
  const [analyseData, setAnalyseData] = useState({});
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Analyse API call
        const analyseResponse = await axios.post(
          'https://prep-me-up.onrender.com/analyse',
          { interviewId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnalyseData(analyseResponse.data.info);
        console.log('Analysed interview data', analyseResponse.data.info);

        // Fetch Interview API call
        const interviewResponse = await axios.get(
          `https://prep-me-up.onrender.com/fetchinterviewbyid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        interviewResponse.data.info.conversation.shift()
        setConversation(interviewResponse.data.info.conversation);
        console.log('Fetched interview data', interviewResponse.data.info.conversation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <div className='flex bg-background'>
        <Sidebar/>
        <div className='bg-background w-full p-3'>
          <div>
            <p className='text-white text-3xl'>Interview Analysis</p>
            <p className='text-neutral-300 text-2xl mt-4'>Job Role: <span>Frontend Developer</span></p>
          </div>
          <div className='my-4'>
            <button className='bg-primary px-4 py-2 rounded-lg font-bold'>Re-Analyse</button>
          </div>
          <div className='bg-primaryGray p-3 rounded-2xl'>
            <div className='flex items-start gap-2'>
              <Rocket className='text-primary' size={36}/>
              <p className='text-white text-lg'>Tips : <span className='text-gray-300'>{analyseData.tips}</span></p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4 mt-4'>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Speaking Fluency</p>
                <Speech className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.speakingFluency}</span> /10</p>
              </div>
            </div>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Grammar</p>
                <Languages className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.grammar}</span> /10</p>
              </div>
            </div>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Answer Accuracy</p>
                <Target className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.accuracyInAnswer}</span> /10</p>
              </div>
            </div>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Project Rating</p>
                <Workflow className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.projectRating}</span> /10</p>
              </div>
            </div>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Problem Solving Ability</p>
                <AlertTriangle className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.problemSolvingAbility}</span> /10</p>
              </div>
            </div>
            <div className='bg-primaryGray w-60 rounded-2xl p-2'>
              <div className='flex justify-between px-4'>
                <p className='text-white text-lg'>Overall Score</p>
                <FileDigit className='text-primary' size={48}/>
              </div>
              <div className='px-4'>
                  <p className='text-white text-xl'><span className='text-white text-4xl'>{analyseData.totalScore}</span> /10</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primaryGray h-screen rounded-tl-2xl rounded-bl-2xl w-1/2 pl-2 pt-2">
          <p className='text-white text-2xl text-center mt-2'>Conversation</p>
          
          <ScrollArea.Root className="w-full rounded overflow-hidden">
            <ScrollArea.Viewport className="w-full h-[580px] rounded">
              <div className="py-[15px] px-5">
                {
                  conversation.map((conv, index)=>(
                    <div key={index} className={index % 2 ? "flex justify-end" : "flex justify-start"}>
                      <div className={index % 2 ? "bg-primary w-64 h-fit p-3 rounded-xl mt-2" : "bg-background w-64 h-fit p-3 rounded-xl mt-2"}>
                        <p className={index % 2 ? "text-black" : "text-neutral-300"}>{conv.message}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA5" />
          </ScrollArea.Root>
        </div>
      </div>
    </>
  )
}

export default ShowAnalysis