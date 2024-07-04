"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateInspectionForm } from "./CreateInspectionForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/Api/Index";

export function ShowUpdatedOuvrage({ isOpen, onClose, InspectionID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState({});

  console.log("rrrrrrrrrrrrrrrrr");
  useEffect(() => {
    if (isOpen && InspectionID) {
      const fetchInformation = async () => {
        try {
          const response = await axiosInstance.get(`/result/${InspectionID}`);
          console.log("reeeeeeeeeee", response.data.inspectionResult);
          setResult(response.data.inspectionResult);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchInformation();
    }
  }, [isOpen, InspectionID]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined
    const parts = dateString.split("T");
    return parts[0] || ""; // Return the date part or empty string if split fails
  };
  if (!isOpen) return null;
  return (
    !isLoading && (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          <div className="cursor-pointer no-underline hover:underline">
            <h1 className="text-md font-semibold">8888</h1>
          </div>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-xl">E&P final results</DialogTitle>
              {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Next inspection date</h1>
                <h1 className="text-md font-medium">
                  <span className="">
                    {" "}
                    {formatDate(result.next_inspection)}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Result</h1>
                <h1 className="text-md font-medium">
                  {result.status === "work"
                    ? "l'ouvrage still wrking"
                    : "l'ouvrae est abondoné"}
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Observation</h1>
                <div className="border border-gray-500 p-4">
                  {result.observation}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    )
  );
}
