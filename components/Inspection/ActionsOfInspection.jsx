"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateInspection } from "./CreateInspection";
import { InspectionDepartementRapport } from "./InspectionDepartementRapport";
import { EpEvaluation } from "./EpEvaluation";
import { ConstructionRaport } from "./ConstructionReport";
import { useEffect, useState } from "react";
import { UpdateAndTerminate } from "./UpdateAndTerminate";
import { useAuth } from "@/context/AuthContext";
import { ConstructionRaportStatus } from "./ConstructionRaportStatus";
import { UpdateOuvrage } from "./UpdateOuvrage";

const ActionOfInspection = ({ inspection, inspectionID }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user !== undefined) {
      setUserData(user);
      setLoading(false);
    }
  }, [user]);

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!loading && (
          <DropdownMenuGroup>
            {!inspection.Ins_reportID && userData.role === "inspection" && (
              <DropdownMenuItem
                onSelect={handleItemClick}
                className="cursor-pointer"
              >
                <InspectionDepartementRapport inspectionID={inspectionID} />
              </DropdownMenuItem>
            )}
            {!inspection.evaluationID &&
              inspection.Ins_reportID &&
              userData.role === "ep" && (
                <DropdownMenuItem
                  onSelect={handleItemClick}
                  className="cursor-pointer"
                >
                  <EpEvaluation inspectionID={inspectionID} />
                </DropdownMenuItem>
              )}

            {!inspection.constructionID &&
              inspection.evaluationID &&
              inspection.Ins_reportID &&
              userData.role === "construction" && (
                <DropdownMenuItem
                  onSelect={handleItemClick}
                  className="cursor-pointer"
                >
                  <ConstructionRaport inspectionID={inspectionID} />
                </DropdownMenuItem>
              )}

            {!inspection.constructionID &&
              inspection.evaluationID &&
              inspection.Ins_reportID &&
              userData.role === "construction" && (
                <DropdownMenuItem
                  onSelect={handleItemClick}
                  className="cursor-pointer"
                >
                  <ConstructionRaportStatus inspectionID={inspectionID} />
                </DropdownMenuItem>
              )}

           
            
            {inspection.constructionID &&
              inspection.evaluationID &&
              inspection.Ins_reportID &&
              inspection.status!== "updated" &&
              userData.role === "ep" &&  (
                <DropdownMenuItem
                  onSelect={handleItemClick}
                  className="cursor-pointer"
                >
                  <UpdateOuvrage inspection={inspection} inspectionID={inspectionID} />
                </DropdownMenuItem>
              )}
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionOfInspection;
