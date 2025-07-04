import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import {
  Code,
  Server,
  Layers,
  BarChart3,
  Database,
  PenTool,
  Smartphone,
  Brain,
  Shield,
  Briefcase,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  { label: "Frontend", icon: Code, color: "text-pink-600" },
  { label: "Backend", icon: Server, color: "text-blue-600" },
  { label: "Full-Stack", icon: Layers, color: "text-purple-600" },
  { label: "Data Science", icon: BarChart3, color: "text-amber-600" },
  { label: "DevOps", icon: Database, color: "text-green-600" },
  { label: "UI/UX", icon: PenTool, color: "text-fuchsia-600" },
  { label: "Mobile Dev", icon: Smartphone, color: "text-red-600" },
  { label: "AI Engineer", icon: Brain, color: "text-indigo-600" },
  { label: "Security", icon: Shield, color: "text-cyan-600" },
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="my-10 px-4">
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent className="gap-2">
          {categories.map(({ label, icon: Icon, color }, i) => (
            <CarouselItem key={i} className="basis-1/5 flex justify-center">
              <Button onClick={()=>searchJobHandler(label)}
                variant="outline"
                className="rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-100 transition whitespace-nowrap"
              >
                <Icon size={16} className={color} />
                {label}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
