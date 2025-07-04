import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const { loading ,user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
            Login to Your Account
          </h1>

          <div className="space-y-5">
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
              <Label className="mb-2 block">Login As</Label>
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
            {loading ? (
              <Button className="w-full mt-4">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            )}

            <div className="flex items-center justify-center">
              <span className="text-sm">
                Don't have an Account?{" "}
                <Link to={"/signup"} className="text-blue-600">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
