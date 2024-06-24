import LeftSideBar from "@/components/shared/LeftSideBar";
import React from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DemandeInspection from "@/components/Inspection/Demande";
import { CreateInspection } from "@/components/Inspection/CreateInspection";
import { InspectionDepartementRapport } from "@/components/Inspection/InspectionDepartementRapport";
import { EpEvaluation } from "@/components/Inspection/EpEvaluation";
import { ConstructionRaport } from "@/components/Inspection/ConstructionReport";
import { ShowEpNote } from "@/components/Inspection/ShowEpNote";
import { ShowInspectionDepRapport } from "@/components/Inspection/ShowInspectionDepRapport";
import { ShowEvaluation } from "@/components/Inspection/ShowEvaluation";
import { ShowConstructionRapport } from "@/components/Inspection/ShowConstructionRapport";
function page() {
  return (
    <div className="flex flex-row bg-gray-100 overflow-y-auto overflow-x-auto h-screen no-scrollbar">
      <div className="bg-white w-[20%] h-screen sticky top-0">
        <div className="flex flex-col justify-between my-4">
          <div className="relative flex justify-start  py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-5">
            <AutoAwesomeIcon className="h-8 w-8" />
            <h1 className="text-xl font-semibold">demande</h1>
          </div>
          <div className="flex flex-row gap-4 items-center justify-start py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-5">
            <AutoAwesomeIcon className="h-8 w-8" />
            <h1 className="text-xl font-semibold">programme</h1>
          </div>
          <CreateInspection/>
          <InspectionDepartementRapport/>
          <EpEvaluation/>
          <ConstructionRaport/>
          <ShowEpNote/>
          <ShowInspectionDepRapport/>
          <ShowEvaluation/>
          <ShowConstructionRapport/>
        </div>
      </div>
      <div className="flex flex-col mx-4 my-3 gap-4 w-full">
        <h1 className="text-4xl font-bold">Inspection</h1>
        <DemandeInspection/>
      </div>
    </div>
  );
}

export default page;
