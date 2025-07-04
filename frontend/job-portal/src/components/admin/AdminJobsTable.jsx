import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobsByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    if (!searchJobsByText) {
      setFilterJobs(allAdminJobs);
    } else {
      const filtered = allAdminJobs.filter(
        (job) =>
          job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobsByText.toLowerCase())
      );
      setFilterJobs(filtered);
    }
  }, [allAdminJobs, searchJobsByText]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <Table>
        <TableCaption className="text-gray-500 mb-3">
          Your recently posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="w-20 pl-6">Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                🚫 No job is posted yet
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition-colors even:bg-gray-50"
              >
                {/* Company Logo */}
                <TableCell className="pl-6">
                  <img
                    src={
                      job?.company?.logo ||
                      "https://via.placeholder.com/40x40.png?text=Logo"
                    }
                    alt="Logo"
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </TableCell>

                {/* Company Name */}
                <TableCell>{job?.company?.name}</TableCell>

                {/* Role */}
                <TableCell className="font-medium">{job?.title}</TableCell>

                {/* Date */}
                <TableCell className="text-gray-600">
                  {job?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        title="Actions"
                      >
                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-purple-600" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-fit shadow-lg rounded-lg p-2">
                      <div className="flex flex-col gap-2">
                        {/* View Applicants */}
                        <button
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 w-full text-left"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                          <span>View Applicants</span>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
