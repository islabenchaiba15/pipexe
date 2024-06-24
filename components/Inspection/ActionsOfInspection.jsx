'use client'
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
import { useState } from "react";
import { UpdateAndTerminate } from "./UpdateAndTerminate";

const ActionOfInspection = () => {
  const [open, setOpen] = useState(false);

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleItemClick} className="cursor-pointer">
            <CreateInspection />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleItemClick} className="cursor-pointer">
            <InspectionDepartementRapport />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleItemClick} className="cursor-pointer">
            <EpEvaluation />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleItemClick} className="cursor-pointer">
            <ConstructionRaport />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleItemClick} className="cursor-pointer">
            <UpdateAndTerminate />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionOfInspection;
