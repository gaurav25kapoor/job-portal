import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, PenIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white border rounded-2xl mt-10 mb-8 p-8 relative">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex gap-4 items-center">
              <Avatar className="h-24 w-24 ring-2 ring-purple-300">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {user?.fullname}
                </h1>
                <p className="text-sm text-gray-600 mt-1 max-w-md">
                  {user?.profile?.bio || "No bio yet."}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              variant="outline"
              className="rounded-full"
              title="Edit Profile"
            >
              <PenIcon className="h-4 w-4 text-purple-600" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4 text-purple-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Contact className="h-4 w-4 text-purple-500" />
              <span>{user?.phoneNumber || "Not provided"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 capitalize"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills added yet.</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <Label className="text-lg font-semibold text-gray-800">
              Resume
            </Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="block text-blue-600 hover:underline mt-1"
                rel="noopener noreferrer"
              >
                {user?.profile?.resumeOrignalName || "View Resume"}
              </a>
            ) : (
              <span className="text-gray-500 mt-1 block">Not uploaded yet.</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white border rounded-2xl p-6 ">
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
