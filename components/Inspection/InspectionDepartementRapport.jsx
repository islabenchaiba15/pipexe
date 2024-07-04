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
import { InspectionDepForm } from "./InspectionDepForm";

export function InspectionDepartementRapport({ inspectionID }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center justify-start rounded-md cursor-pointer">
          <AutoAwesomeIcon fontSize="small" />
          <h1 className="text-md font-semibold">Send rapport (Ins)</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Send the rapport to E&P</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <InspectionDepForm inspectionID={inspectionID} />
      </DialogContent>
    </Dialog>
  );
}
