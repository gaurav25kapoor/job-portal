import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const jobs = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    if (lower === "rejected")
      return (
        <Badge className="bg-red-100 text-red-700">
          ❌ Rejected
        </Badge>
      );
    if (lower === "pending")
      return (
        <Badge className="bg-yellow-100 text-yellow-700">
          ⏳ Pending
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700">✅ Accepted</Badge>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Applied Jobs
      </h2>

      <div className="overflow-x-auto rounded-md">
        <Table>
          <TableCaption className="text-sm text-gray-500 mt-2">
            Overview of your job applications.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-gray-700">Date</TableHead>
              <TableHead className="text-gray-700">Job Role</TableHead>
              <TableHead className="text-gray-700">Company</TableHead>
              <TableHead className="text-right text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-6 italic"
                >
                  You haven’t applied to any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    {appliedJob?.createdAt?.split("T")[0] || "—"}
                  </TableCell>
                  <TableCell>{appliedJob.job?.title || "—"}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name || "—"}</TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(appliedJob.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
