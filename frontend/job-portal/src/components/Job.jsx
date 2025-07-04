import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Logo & Company */}
      <div className="flex items-center gap-3 my-4">
        <div className="h-12 w-12 flex items-center justify-center bg-white border rounded">
          <img
            src={
              job?.company?.logo ||
              "https://via.placeholder.com/40.png?text=Logo"
            }
            alt="Logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold my-2 text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant={"outline"}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#7209b7]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
