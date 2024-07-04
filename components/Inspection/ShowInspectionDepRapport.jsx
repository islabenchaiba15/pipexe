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

export function ShowInspectionDepRapport({ isOpen, onClose, InspectionID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [inspectionReport, setInspectionReport] = useState({});

  console.log("yyyyyyyyy");
  useEffect(() => {
    if (isOpen && InspectionID) {
      const fetchInformation = async () => {
        try {
          const response = await axiosInstance.get(
            `/inpectionReport/${InspectionID}`
          );

          console.log("reeeeeeeeeee", response.data.inspectionReport);
          setInspectionReport(response.data.inspectionReport);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchInformation();
    }
  }, [isOpen, InspectionID]);
  const donwloadFiles = async (fileType) => {
    console.log("raniaaaaaaaaaaaaaaaaa");

    try {
      const response = await axiosInstance.get(
        `/epnote/download/${InspectionID}`,
        {
          responseType: "blob",
          params: { fileType }, // Important to handle binary data
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "file.pdf"; // You can set the desired file name here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };
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
            <h1 className="text-md font-semibold">7777</h1>
          </div>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Inspection departement non periodic report
              </DialogTitle>
              {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <Image src={"/user.png"} alt={"user"} width={80} height={80} />
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-col items-start gap-3">
                    <h1 className="font-bold text-md">
                      {inspectionReport.Ins_reportID.user.nom}
                    </h1>
                    <h1 className="">
                      {inspectionReport.Ins_reportID.user.position} --{" "}
                      {inspectionReport.Ins_reportID.user.departement}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Inspection date</h1>
                <h1 className="text-md font-medium">
                  <span className="">
                    {" "}
                    {formatDate(inspectionReport.Ins_reportID.date)}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">File version</h1>
                <h1 className="text-md font-medium">
                  <span className="">
                    Rapport validated and{" "}
                    {inspectionReport.Ins_reportID.version}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Message</h1>
                <div className="border border-gray-500 p-4">
                  {inspectionReport.Ins_reportID.message}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Inpection departement report </h1>
                <div className="flex gap-6 ">
                  <h1 className="font-medium">Donwload</h1>
                  <Image
                    onClick={() => donwloadFiles("ficher")}
                    src={"/download.png"}
                    className="cursor-pointer"
                    alt="download"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    )
  );
}
