import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create company. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-12 px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-lg w-full">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
            🚀 Create Your Company
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Give your company a name. You can change it anytime.
          </p>

          <div className="mb-6">
            <Label className="text-sm text-gray-700">Company Name</Label>
            <Input
              type="text"
              className="mt-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-sm rounded-xl"
              placeholder="e.g., JobHunt, Microsoft"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md rounded-xl w-full text-white"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 rounded-xl w-full"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
