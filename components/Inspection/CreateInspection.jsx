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

export function CreateInspection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center justify-start rounded-md cursor-pointer">
          <AutoAwesomeIcon fontSize="small" />
          <h1 className="text-md font-semibold">establish inspection</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Establish non-periodic inspection</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <CreateInspectionForm/>
      </DialogContent>
    </Dialog>
  );
}
