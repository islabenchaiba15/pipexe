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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateInspectionForm } from "./CreateInspectionForm";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/Api/Index";
export function ShowConstructionRapport({ isOpen, onClose, InspectionID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [construction, setConstruction] = useState({});
  const [activity, setActivity] = useState({});

  useEffect(() => {
    if (isOpen && InspectionID) {
      const fetchInformation = async () => {
        try {
          const response = await axiosInstance.get(
            `/construction/${InspectionID}`
          );
          const response2 = await axiosInstance.get(
            `/constructionStatus/${InspectionID}`
          );
          console.log("reeeeeeeeeee", response2.data.ConstructionStatusinstance);
          setConstruction(response.data.construction);
          setActivity(response2.data.ConstructionStatusinstance);

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
            <h1 className="text-md font-semibold">9999</h1>
          </div>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Construction tracking & report
              </DialogTitle>
              <DialogDescription className="bg-blue-800 w-fit  rounded-full">
                <div className="">
                  <h1 className="font-semibold text-white mx-3 my-1">
                    in work
                  </h1>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="report" className="w-full">
              <TabsList className="">
                <TabsTrigger value="report">report</TabsTrigger>
                <TabsTrigger value="activity">activity</TabsTrigger>
              </TabsList>
              <TabsContent value="report">
                <div className="flex flex-col gap-4 mx-2 my-8">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={"/user.png"}
                      alt={"user"}
                      width={80}
                      height={80}
                    />
                   <div className="flex flex-col items-start gap-3">
            <h1 className="font-bold text-md">{construction.user.nom}</h1>
            <h1 className="">{construction.user.position} -- {construction.user.departement}</h1>
          </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-md">Inspection date</h1>
                    <h1 className="text-md font-medium">
                      <span className="">
                        {" "}
                        {formatDate(construction.constructionID.date)}
                      </span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-md">message</h1>
                    <div className="border border-gray-500 p-4">
                      {construction.constructionID.message}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">construction final report </h1>
                    <div className="flex gap-6 ">
                      <h1 className="font-medium">donwload</h1>
                      <Image
                        src={"/download.png"}
                        className="cursor-pointer"
                        alt="download"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="mx-4 my-3">
                ddddd
                <div className="flex flex-col gap-4">
                  <h1>kkkk</h1>
                    <div className="flex gap-4 items-start" >
                      <CheckCircleIcon fontSize="small" className="mt-1" />
                      <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-md">ddd</h1>
                        <h1 className="font-medium text-sm text-gray-600">
dddd                        </h1>
                      </div>
                    </div>;
                  
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    )
  );
}
