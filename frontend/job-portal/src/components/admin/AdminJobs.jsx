import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";

import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobsByText } from "@/redux/jobSlice";

const AdminJobs= () => {
  useGetAllAdminJobs()
  const [input,setInput]=useState("")
  const navigate = useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setSearchJobsByText(input))
  },[input])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Input
            className="w-full sm:w-1/3 shadow-sm"
            placeholder="Search for jobs..."
            onChange={(e)=>setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-purple-700 hover:bg-purple-700 shadow-md cursor-pointer"
          >
           <PlusCircleIcon/> Post Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
