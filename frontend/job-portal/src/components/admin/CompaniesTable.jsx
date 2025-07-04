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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [] ,searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany,setFilterCompany]=useState(companies)
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredCompany=companies.length >=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        setFilterCompany(companies)
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <Table>
        <TableCaption className="text-gray-500 mb-3">
          Your recently registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="w-20 text-center">Logo</TableHead>
            <TableHead className="px-4">Name</TableHead>
            <TableHead className="px-4">Date</TableHead>
            <TableHead className="px-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6"
              >
                🚫 No company is registered yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors even:bg-gray-50"
              >
                {/* Logo */}
                <TableCell className="px-4">
                  <div className="flex items-center justify-center">
                    <Avatar className="h-10 w-10 object-cover">
                      <AvatarImage
                        src={
                          company.logo ||
                          "https://via.placeholder.com/40x40.png?text=Logo"
                        }
                        alt="Company Logo"
                      />
                    </Avatar>
                  </div>
                </TableCell>

                {/* Name */}
                <TableCell className="font-medium px-4">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell className="text-gray-600 px-4">
                  {company.createdAt?.split("T")[0] || "N/A"}
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-purple-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 shadow-md rounded-lg">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <Edit2 className="w-4 text-gray-700" />
                        <span>Edit</span>
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

export default CompaniesTable;
