"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { CreatePeriodicInspection } from "./CreatePeriodicInspection";
import { axiosInstance } from "@/Api/Index";
import Image from "next/image";
import ActionDropdown from "../ActionDropdown";
const PeriodicInspection = () => {
  const invoices = [
    {
      nom: "INV005",
      latitude: "31.456643223445",
      longitude: "5.123456789",
      elevation: "1000",
      actions: "Delete",
    },
  ];
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await axiosInstance.get("/inspection/periodic/get");
        setInspections(response.data.PeriodicInspections || []);
        console.log(response.data.inspections, "popppppppppppp");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching inspections:", error);
        setError("Failed to fetch inspections");
        setIsLoading(false);
      }
    };
    fetchInformation();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined
    const parts = dateString.split("-");
    return parts[0] || ""; // Return the date part or empty string if split fails
  };

  const donwloadFiles = async (id) => {
    console.log("Downloading file for id:", id);
    if (!id) {
      console.error("No id provided for file download");
      return;
    }
    console.log("raniaaaaaaaaaaaaaaaaa");

    try {
      const response = await axiosInstance.get(
        `/inspection/periodic/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "file.csv"; // You can set the desired file name here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };
  return (
    !isLoading && (
      <div className="p-5 bg-white">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-bold text-md mx-2 my-">Overview</h1>
          <CreatePeriodicInspection />
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-black font-bold">
                Number{" "}
              </TableHead>
              <TableHead className="w-[200px] font-bold text-black">
                Year
              </TableHead>
              <TableHead className="font-bold text-black">
                observation
              </TableHead>
              <TableHead className="font-bold w-[100px] text-black cursor-pointer">
                file
              </TableHead>
              <TableHead className="font-bold text-black flex justify-end mx-4 items-center">
                actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inspections.map((inspection, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {formatDate(inspection.year)}
                </TableCell>
                <TableCell className="font-medium">
                  {inspection.observation}
                </TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={"/download.png"}
                    alt={"downlaod"}
                    width={25}
                    height={25}
                    onClick={() => donwloadFiles(inspection._id)}
                  />
                </TableCell>
                <TableCell className="font-medium flex justify-end mx-4">
                  <ActionDropdown />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
};
export default PeriodicInspection;
