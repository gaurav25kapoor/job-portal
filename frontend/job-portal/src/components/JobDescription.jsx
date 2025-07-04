import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

import {
  Briefcase,
  MapPin,
  CalendarDays,
  UserPlus,
  Coins,
  BadgeCheck,
  FileText,
} from "lucide-react";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application?.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application?.applicant === user?._id
            )
          );
        }
      } catch (error) {
        
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob)
    return <div className="pt-20 text-center py-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="pt-6 max-w-6xl mx-auto my-10 px-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-3 gap-0">
          {/* Left Info Panel */}
          <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {singleJob?.title}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {singleJob?.company?.name || "Company"}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 font-medium">
                  {singleJob?.position} {singleJob?.position > 1 ? "Positions" : "Position"}
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 font-medium">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-medium">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`mt-6 rounded-lg text-white text-lg font-medium ${
                isApplied
                  ? "bg-green-600 hover:bg-green-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5e0997] cursor-pointer"
              }`}
            >
              {isApplied ? "Already Applied ✓" : "Apply Now"}
            </Button>
          </div>

          {/* Middle - Description */}
          <div className="md:col-span-2 p-6 md:p-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="text-purple-600" /> Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed tracking-wide whitespace-pre-line">
                {singleJob?.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Briefcase className="text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Role</p>
                  <p className="text-sm text-gray-600">{singleJob?.title}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-sm text-gray-600">{singleJob?.location}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-pink-100 p-2 rounded-full">
                  <BadgeCheck className="text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold">Experience</p>
                  <p className="text-sm text-gray-600">
                    {singleJob?.experienceLevel} year
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-green-100 p-2 rounded-full">
                  <UserPlus className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Total Applicants</p>
                  <p className="text-sm text-gray-600">
                    {singleJob?.application?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Coins className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold">Salary</p>
                  <p className="text-sm text-gray-600">{singleJob?.salary} LPA</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/70 rounded-xl p-4 shadow">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <CalendarDays className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold">Posted On</p>
                  <p className="text-sm text-gray-600">
                    {new Date(singleJob?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
