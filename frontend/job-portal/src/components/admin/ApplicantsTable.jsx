import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = [
  {
    label: "Accepted",
    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
  },
  { label: "Rejected", icon: <XCircle className="w-4 h-4 text-red-600" /> },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <Table>
        <TableCaption className="text-gray-500 mt-2">
          📄 Recently applied users
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-700">Full Name</TableHead>
            <TableHead className="text-gray-700">Email</TableHead>
            <TableHead className="text-gray-700">Contact</TableHead>
            <TableHead className="text-gray-700">Resume</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
            <TableHead className="text-right text-gray-700 pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.application?.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 even:bg-gray-50 transition"
              >
                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume &&
                  item.applicant?.profile?.resume !== "null" &&
                  item.applicant?.profile?.resume !== "undefined" ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName || "Resume"}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right pr-6">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-purple-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 shadow-lg rounded-lg p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status.label, item?._id)}
                          key={index}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          {status.icon}
                          <span className="text-sm text-gray-700">
                            {status.label}
                          </span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
