import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-2">
        <div>
          <Link to={"/"}>
            <h1 className="text-3xl font-bold">
              Job<span className="text-[#F83002]">Hunt</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] cursor-pointer">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-purple-700 hover:bg-purple-700 cursor-pointer">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border hover:shadow transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <hr className="mb-3 border-gray-200" />

                <div className="flex flex-col gap-2">
                  {user && user?.role === "student" && (
                    <Button
                      variant="ghost"
                      className="flex justify-start items-center gap-2 text-sm hover:bg-gray-100 rounded-md px-2 py-2"
                    >
                      <User2 size={18} />
                      <Link to={"/profile"}>View Profile</Link>
                    </Button>
                  )}

                  <Button
                    onClick={logoutHandler}
                    variant="ghost"
                    className="flex justify-start items-center gap-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md px-2 py-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
