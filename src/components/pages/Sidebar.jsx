import React from 'react'
import { ScatterChart,ShieldQuestion, FilePlus2, Plus, ChevronUp  } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-2/12 h-[100vh] flex flex-col items-center justify-between p-4 bg-[#2d2d2d]">
          <div className="flex flex-col gap-4">
              <Link to={`/dashboard`} className="text-3xl text-white">Prep Me Up</Link>
              <div className="w-full">
                  <button className='bg-primary flex items-center justify-center py-2 gap-2 w-full text-center rounded-lg text-neutral-950 font-semibold' type='submit'><Plus/><Link to="/interview">New Interview</Link></button>
              </div>
              <hr />
              <div className="flex flex-col gap-2">
                <NavLink to={`/analyse-interview`} style={({isActive})=>({backgroundColor: isActive ? "#484848" : ""})} className="flex justify-start items-center gap-2 text-white w-full rounded-lg px-3 py-2 hover:bg-[#383838]">
                    <ScatterChart strokeWidth={2} size={24} color="white"/>
                    <p>Analyse Interview</p>
                </NavLink>
                <NavLink to={`/common-question`} style={({isActive})=>({backgroundColor: isActive ? "#484848" : ""})} className="flex justify-start items-center gap-2 text-white w-full rounded-lg px-3 py-2 hover:bg-[#383838]">
                    <ShieldQuestion strokeWidth={2} size={24} color="white"/>
                    <p>Common Question</p>
                </NavLink>
                <NavLink to={`/resume-maker`} style={({isActive})=>({backgroundColor: isActive ? "#484848" : ""})} className="flex justify-start items-center gap-2 text-white w-full rounded-lg px-3 py-2 hover:bg-[#383838]">
                    <FilePlus2 strokeWidth={2} size={24} color="white"/>
                    <p>Resume Maker</p>
                </NavLink>
              </div>
          </div>
          <div>
            <hr className="w-full mb-4 border-t-[#606060]"/>
              <div className="bg-[#1e1e1e] w-full flex gap-2 items-center justify-between rounded-lg px-3 py-3 border-2 border-neutral-600">
                  <div className="h-8 w-8 bg-neutral-500 rounded-full"></div>
                  <p className="text-white">SwastikKasera</p>
                  <div><ChevronUp size={18} color="white"/></div>
                </div>
              <div></div>
          </div>
        </div>
  )
}

export default Sidebar