import React from "react";
import LatestJobCards from "./LatestJobCards";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const LatestJobs = () => {
  const {allJobs}=useSelector(store=>store.job)
 
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <=0 ?<span>No Job Available</span>:allJobs.slice(0, 6).map((job) => (
          <LatestJobCards  key={job._id} job={job}/>
        ))}
      </div>

      <div className="flex items-center justify-center mt-16">
        <Link to={"/jobs"}>
          <Button className="group inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-md border border-black text-black px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md cursor-pointer">
            Explore more jobs
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestJobs;
