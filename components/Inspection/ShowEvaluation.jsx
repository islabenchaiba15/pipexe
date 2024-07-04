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

export function ShowEvaluation({ isOpen, onClose, InspectionID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [evaluation, setEvaluation] = useState({});

  console.log("rrrrrrrrrrrrrrrrr");
  useEffect(() => {
    if (isOpen && InspectionID) {
      const fetchInformation = async () => {
        try {
          const response = await axiosInstance.get(
            `/evaluation/${InspectionID}`
          );
          console.log("reeeeeeeeeee", response.data.inspectionData);
          setEvaluation(response.data.inspectionEvaluation);
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
            <h1 className="text-md font-semibold">8888</h1>
          </div>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                E&P inspection evaluation & decision
              </DialogTitle>
              {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <Image src={"/user.png"} alt={"user"} width={80} height={80} />
                <div className="flex flex-col items-start gap-3">
                  <h1 className="font-bold text-md">
                    {evaluation.evaluationID.user.nom}
                  </h1>
                  <h1 className="">
                    {evaluation.evaluationID.user.position} --{" "}
                    {evaluation.evaluationID.user.departement}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Inspection date</h1>
                <h1 className="text-md font-medium">
                  <span className="">
                    {" "}
                    {formatDate(evaluation.evaluationID.date)}
                  </span>
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Result</h1>
                <h1 className="text-md font-medium">
                  {evaluation.evaluationID.result === "passer"
                    ? "étape a passé a deparetment de construction"
                    : "l inspe"}
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">Message</h1>
                <div className="border border-gray-500 p-4">
                  {evaluation.evaluationID.message}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">E&P pv report </h1>
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
