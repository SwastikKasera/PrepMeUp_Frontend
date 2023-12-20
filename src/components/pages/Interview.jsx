import React, { useEffect, useState } from "react";
import { Mic, MicOff, SendHorizontal, Video } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";
import Webcam from "react-webcam";
import { ThreeDots } from 'react-loader-spinner'
import { Link } from "react-router-dom";

const Interview = () => {
  const [interviewerQuestion, setInterviewerQuestion] = useState("");
  const [jobProfile, setJobProfile] = useState({
    jobTitle: "Motion Graphics Designer",
  });
  const [audioUrl, setAudioUrl] = useState("")
  // const [jobRole, setJobRole] = useState("Motion Graphics Designer");
  const [popUpVisible, setPopupVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  
  const userSpeech = {
    userSpeech: transcript,
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
  };

  const jobRoles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Data Analytics"];
  const handleJobSelectChange = (e) => {
    setJobProfile((prevJob) => ({
      ...prevJob,
      jobTitle: e.target.value,
    }));
  };
  useEffect(() => {
    if (browserSupportsSpeechRecognition && isListening) {
      const listeningOptions = {
        continuous: true,
        interimResults: false,
        language: "en-US",
      };
      SpeechRecognition.startListening(listeningOptions);
    } else {
      SpeechRecognition.stopListening();
    }
  }, [browserSupportsSpeechRecognition, isListening]);

  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobProfile((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const token = Cookies.get("token");

  const sendJobDetail = async (e) => {
    e.preventDefault();
    try {
      const jobRoleResponse = await axios.post(
        "https://prep-me-up.onrender.com/interview",
        jobProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Job role response", jobRoleResponse);
      if (jobRoleResponse.status === 201) {
        // send data to get audio
        setInterviewerQuestion(jobRoleResponse.data.aimessage[1].message);
        setAudioUrl(jobRoleResponse.data.audioUrl)
        console.log(jobRoleResponse.data.aimessage[1].message);
        setPopupVisible(false);
      } else {
        toast.error("Unable to set Job profile");
      }
    } catch (error) {
      return toast.error("Fail to send job profile");
    }
  };

  const sendConversation = async () => {
    try {
      const convResponse = await axios.post(
        "https://prep-me-up.onrender.com/interview/conversation",
        userSpeech,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (convResponse.status === 201) {
        setAudioUrl(convResponse.data.audioUrl)
        setInterviewerQuestion(convResponse.data.aimessage[1].message)
        // setUserAnswer(transcript);
        console.log("convRes", convResponse);
        console.log("AudioURL", audioUrl);
      }else{
        return toast.error("Unable to send your answer");
      }
    } catch (error) {
      return toast.error("Error in sending conversation");
    }
  };

  const resetAnswer = ()=>{
    resetTranscript()
  }
  console.log(transcript);

  return (
    <>
      <div className="pt-6 flex bg-neutral-900 gap-6 h-[100vh] items-start justify-center">
        {popUpVisible ? (
          <div className="bg-[#1e1e1e] p-6 rounded-3xl w-72">
            <form onSubmit={sendJobDetail}>
              <p className="text-white mb-3">Job Title</p>
              <input
                onChange={handleJobInputChange}
                type="text"
                name="jobTitle"
                className="bg-[#111111] h-9 w-full mb-3 border-2 border-zinc-500 rounded-lg"
              />
              <div>
                <button
                  type="submit"
                  className="bg-primary mt-3 py-3 w-full text-center rounded-lg font-bold"
                >
                  Start My Interview
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="pt-6 flex w-full bg-neutral-900 gap-6 h-[100vh] items-start justify-center">
            <div className="flex flex-col gap-6 h-fit max-h-[80%] w-2/4">
              <div className="flex gap-4">
                <h1 className="text-white text-3xl">
                  Interview for the role: 
                </h1>
                <select name="" id="" value={jobProfile.jobTitle} onChange={handleJobSelectChange}
                    className="bg-[#111111] h-9 w-48 mb-3 border-2 px-2 text-white border-zinc-500 rounded-lg">
                  <option defaultChecked disabled>-- Choose Role--</option>
                  {
                    jobRoles.map((role, index)=>(
                      <option key={index} value={role}>{role}</option>
                    ))
                  }
                </select>
                <button onClick={sendJobDetail} className="bg-primary py-2 px-3 text-center rounded-lg text-black">Start my Interview</button>
              </div>
              <div className="flex gap-6 w-full justify between">
                <div className="bg-[#1e1e1e] border-2 w-full border-zinc-600 h-fit rounded-3xl p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                  <p className="text-primary">Interviewer asks...</p>
                  <kbd className="bg-zinc-900 px-2 py-1 w-fit text-white text-sm rounded-md border border-zinc-500 font-bold">
                      R
                  </kbd>
                  </div>
                  <p className="text-zinc-400 text-2xl">
                    {interviewerQuestion}
                  </p>
                </div>
              </div>
              <div className="bg-[#1e1e1e] border-2 border-zinc-600 h-fit w-full rounded-3xl p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                  <p className="text-primary">Your answer...</p>
                  {isListening ? (<ThreeDots width={30} height={30} radius={7} color="#404040" />) : (<kbd className="bg-zinc-900 px-2 py-1 w-fit text-white text-sm rounded-md border border-zinc-500 font-bold">X</kbd>)}
                </div>
                <p className="text-[#efefef] text-xl min-w-full">
                  {transcript.length === 0 ? "Speak your answer" : userSpeech.userSpeech}
                </p>
                <div className="flex justify-start gap-2 items-center">
                  <button onClick={sendConversation} className="bg-zinc-600 rounded-md w-fit h-fit p-1">
                    <SendHorizontal color="#BDEE63" />
                  </button>
                  <kbd className="bg-zinc-900 px-2 py-1 w-fit text-white text-sm rounded-md border border-zinc-500 font-bold">
                      Enter
                  </kbd>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between h-[80%]">
              <div className="w-fit border-2 rounded-3xl border-white">
                <Webcam
                  className="rounded-3xl"
                  mirrored
                  audio={false}
                  width={320}
                  screenshotFormat="image/jpeg"
                />
              </div>
              <div className="w-full p-2">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={toggleMicrophone}
                    className="rounded-full bg-neutral-800 p-2"
                  >
                    {isListening ? (
                      <Mic color="#BDEE63" size={36} strokeWidth={1} />
                    ) : (
                      <MicOff color="#BDEE63" size={36} strokeWidth={1} />
                    )}
                  </button>
                  <button className="rounded-full bg-neutral-800 p-2">
                    <Video color="#BDEE63" size={36} strokeWidth={1} />
                  </button>
                  <button onClick={resetAnswer} className="rounded-lg text-white bg-neutral-800 p-2">
                    Reset Answer
                  </button>
                </div>
              </div>
              <div className="bg-[#1E1E1E] cursor-pointer border-2 border-primary h-fit w-full rounded-3xl flex flex-col p-2 gap-2 items-center justify-center">
                <audio autoPlay src={audioUrl} controls>Your browser does not support the audio element.</audio>
              </div>
              <Link to={`/analyse-interview`} className="bg-rose-500 mt-2 py-2 px-3 w-full text-center rounded-lg text-white">
                  End Interview
              </Link>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </>
  );
};

export default Interview;
