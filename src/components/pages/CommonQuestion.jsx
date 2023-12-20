import React from "react";
import Sidebar from "./Sidebar";
import { Filter, Search, X } from "lucide-react";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';
import Card from "./Card";
import Question from '../data/question.json'
import { Link } from "react-router-dom";


const CommonQuestion = () => {
  const filterOption = ["UI/UX", "Developer", "Frontend", "Backend"]
  const [urlsChecked, setUrlsChecked] = React.useState({
    "UI/UX": false,
    "Developer":false,
    "Frontend":false,
    "Backend":false,
  });
  const handleUrlCheckedChange = (url) => {
    setUrlsChecked({
      ...urlsChecked,
      [url]: !urlsChecked[url],
    });
  };

  return (
    <>
      <div className="flex">
        <Sidebar/>
        <div className="w-full bg-[#181818] h-[100vh] p-3">
          <div className="flex flex-col gap-2 w-full ml-2">
            <h1 className="text-white text-3xl mt-3">Commonly Asked Question</h1>
            <h1 className="text-xl text-gray-400">The curated list where you will find the most commonly asked question in the interview.</h1>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="flex h-10">
              <div className="h-10 w-10 bg-[#2d2d2d] flex justify-center items-center rounded-tl-lg rounded-bl-lg"><Search size={24} className="bg-[#2d2d2d] border-none text-neutral-400"/></div>
              <input className="bg-[#2d2d2d] w-64 p-2 text-white focus:outline-none rounded-br-lg rounded-tr-lg" type="search" placeholder="Search..."/></div>
              <div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="rounded-full px-3 py-2 inline-flex items-center justify-center text-primaryGray bg-primary outline-none"
                      aria-label="Customise options"
                    >
                      <div className='flex justify-center items-center'><Filter /><h1 className='text-base'>Filter</h1></div>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                  <DropdownMenu.Content className="min-w-[150px] bg-primaryGray rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" sideOffset={5}>
                  {filterOption.map((opt, index) => (
                    <DropdownMenu.CheckboxItem
                      key={index}
                      checked={urlsChecked[opt]}
                      className="group text-md py-4 leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-normalGray data-[highlighted]:text-violet1"
                      onCheckedChange={() => handleUrlCheckedChange(opt)}
                    >
                      <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                        {urlsChecked[opt] && <CheckIcon />}
                      </DropdownMenu.ItemIndicator>
                      {opt}
                    </DropdownMenu.CheckboxItem>
                  ))}
                    <DropdownMenu.Arrow className="fill-primaryGray" />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
              <button className="rounded-full px-3 py-1 inline-flex items-center justify-center text-gray-300 border-2 border-gray-500"><X size={24} /> Clear Filter</button>
            </div>
            
              <ScrollArea.Root className="w-full mt-4 h-[450px] rounded overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full rounded">
                  <div className="grid grid-cols-3 gap-4">
                  {Question.data.map((card, index) => (
                    <Link key={index} to={`/answer/${encodeURIComponent(card.question)}`}>
                      <Card key={index} question={card.question} tags={card.tags} />
                    </Link>
                  ))}

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
  );
};

export default CommonQuestion;