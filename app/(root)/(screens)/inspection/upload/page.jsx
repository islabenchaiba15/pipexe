"use client";
import LeftSideBar from "@/components/shared/LeftSideBar";
import React, { memo, useContext, useEffect, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DemandeInspection from "@/components/Inspection/Demande";
import { CreateInspection } from "@/components/Inspection/CreateInspection";
import { axiosInstance } from "@/Api/Index";
import { ConstructionRaportStatus } from "@/components/Inspection/ConstructionRaportStatus";
import { CreatePeriodicInspection } from "@/components/Inspection/CreatePeriodicInspection";
import PeriodicInspection from "@/components/Inspection/PeriodicInspection";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
const page = () => {
  const [wells, setWells] = useState([]);
  const [manifolds, setManifolds] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [stats, setStats] = useState([]);
  const {user}=useAuth()

  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await axiosInstance.get("/well/get-wells");
        const dataa = await axiosInstance.get("/manifold/getAll");
        const dataaa = await axiosInstance.get("/pipe/getAll");
        const stats = await axiosInstance.get("/inspection/stats");
        setWells(response.data);
        setManifolds(dataa.data);
        setPipes(dataaa.data);
        setStats(stats.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchWells();
  }, []);
  useEffect(() => {
    console.log("iloveeeeeeeeee u", stats);
  }, [stats]); // useEffect(() => {
  //   console.log("Updated pipppes state:", pipes);
  //   console.log("Updated wells state:", wells);
  console.log("hate uuuuuuuuuuu");

  console.log("hate uuuuuuuuuuu");
  console.log("hate uuuuuuuuuuu");
  const router = useRouter();
  const handleDirection = () => {
    router.push("http://localhost:3000/inspection");
  };
  // }, [wells, pipes]);
  return (
    <div className="flex flex-row bg-gray-100 overflow-y-auto overflow-x-auto h-screen no-scrollbar">
      <div className="bg-white w-[20%] h-screen sticky top-0">
        <div className="flex flex-col justify-between my-4">
          <Link href={"/inspection/todo"}>
            <div className="relative flex gap-4 justify-start  py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-3">
              <AutoAwesomeIcon className="h-8 w-8" />
              <h1 className="text-xl font-semibold">Requests</h1>
            </div>
          </Link>
          <Link href={"/inspection"}>
            <div className="flex flex-row gap-4 items-center justify-start py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-3">
              <AutoAwesomeIcon className="h-8 w-8" />
              <h1 className="text-xl font-semibold">Program</h1>
            </div>
          </Link>
          {user.role === "ep" && (
            <>
              <CreateInspection
                wells={wells}
                pipes={pipes}
                manifolds={manifolds}
              />
              <Link href={"/inspection/upload"}>
                <div
                  onClick={handleDirection}
                  className="flex flex-row gap-4 items-center justify-start py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-3"
                >
                  <AutoAwesomeIcon className="h-8 w-8" />
                  <h1 className="text-xl font-semibold">Upload</h1>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col mx-4 my-3 gap-4 w-full">
        <h1 className="text-4xl font-bold">Periodic Inspection</h1>
        <PeriodicInspection />
      </div>
    </div>
  );
};

export default page;
