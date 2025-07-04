import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler=(value)=>{
    const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value)
    setInput({...input,companyId:selectedCompany._id})
  }

   const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />

      <div className="flex items-center justify-center py-10">
        <form
        onSubmit={submitHandler}
          action=""
          className="w-full max-w-3xl p-8 bg-white shadow-xl rounded-3xl border border-gray-100"
        >
          {/* Heading */}
          <h2 className="text-4xl font-bold text-black text-center mb-8 mr-8">
            Post a <span className="text-purple-700">New</span> Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-1 block">Job Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g., Frontend Developer"
                className="my-1"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Brief job description"
                className="my-1"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Skills & experience required"
                className="my-1"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Salary</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g., ₹10,00,000/year"
                className="my-1"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g., Remote, Bangalore"
                className="my-1"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                placeholder="e.g., Full-time, Part-time"
                className="my-1"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                placeholder="e.g., 2+ years"
                className="my-1"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="mb-1 block">Number of Positions</Label>
              <Input
                type="number"
                name="position"
                placeholder="e.g., 3"
                className="my-1"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            {companies.length > 0 && (
              <div>
                <Label className="mb-1 block">Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full my-1">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-lg py-2"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post New Job"}
          </Button>

          {companies.length === 0 && (
            <p className="text-sm font-medium text-center mt-4 text-red-600">
              * Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
