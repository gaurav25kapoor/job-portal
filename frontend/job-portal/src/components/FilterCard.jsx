import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "📍 Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "💼 Industry",
    array: ["Frontend", "Backend", "FullStack"],
  },
  {
    filterType: "💰 Salary",
    array: ["0-40k", "42k-1L", "1L-5L"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 text-sm max-w-[420px] w-full">
      <h1 className="font-bold text-lg text-gray-800 mb-3">🎯 Filter Jobs</h1>

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-4"
      >
        {filterData.map((data, index) => (
          <div
            key={index}
            className="mb-2 last:mb-0 border-b pb-2 border-gray-100"
          >
            <h2 className="font-medium text-sm text-blue-600 mb-1">
              {data.filterType}
            </h2>

            <div className="space-y-1">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer transition 
                      ${selectedValue === item ? "bg-blue-50" : ""}`}
                  >
                    <RadioGroupItem id={itemId} value={item} />
                    <span className="text-gray-700">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
