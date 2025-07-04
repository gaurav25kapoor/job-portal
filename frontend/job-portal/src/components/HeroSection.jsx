import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <div className="text-center mt-3">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#fa3002] font-medium">
          Smarter Job Hunting Starts Here
        </span>
        <h1 className="text-5xl font-bold">
          Search,Apply &<br />
          Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p className="ml-7 text-md">JobHunt is a smart job-matching platform connecting top talent with the right opportunities effortlessly</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-full mx-auto items-center justify-center gap-4 pl-3">
          <input type="text"onChange={(e)=>setQuery(e.target.value)} placeholder="Find your dream jobs" className="text-sm pl-1 outline-none border-none w-full"/>
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2] hover:bg-[#6a38c2] cursor-pointer">
            <Search className="h-5 w-5"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
