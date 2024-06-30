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
import { InspectionPeriodicFile } from "./InspectionPeriodicFile";

export function CreatePeriodicInspection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" my-2 font-bold">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Upload periodic inspections file
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <InspectionPeriodicFile />
      </DialogContent>
    </Dialog>
  );
}
