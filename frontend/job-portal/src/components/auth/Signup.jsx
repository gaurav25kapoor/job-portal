import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading ,user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
    
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md rounded-xl border border-gray-200 p-6 my-10 shadow-md bg-white"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Create an Account
          </h1>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name" className="block mb-1">
                Full Name
              </Label>
              <Input
                id="name"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                type="text"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                type="email"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="block mb-1">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                type="text"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block mb-1">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-6">
              <Label className="mb-2 block">Register As</Label>
              <RadioGroup className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    name="role"
                    value="student"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    name="role"
                    value="recruiter"
                  />
                  <span>Recruiter</span>
                </label>
              </RadioGroup>
            </div>

          

            <div className="mt-6">
              <Label
                htmlFor="profile"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Upload Profile Photo
              </Label>
              <Input
                onChange={changeFileHandler}
                id="profile"
                type="file"
                accept="image/*"
                className="block w-full border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-black hover:file:bg-gray-200 cursor-pointer"
              />
            </div>

            {loading ? (
              <Button className="w-full mt-4">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4">
                Signup
              </Button>
            )}

            <div className="flex items-center justify-center">
              <span className="text-sm">
                Already have an Account?{" "}
                <Link to={"/login"} className="text-blue-600">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
