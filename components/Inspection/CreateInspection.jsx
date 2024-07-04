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

export function CreateInspection({ wells, pipes, manifolds }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative gap-4 flex justify-start  py-3 px-5 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white mx-3">
          <AutoAwesomeIcon fontSize="small" />
          <h1 className="text-xl font-semibold">Create</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Establish non-periodic inspection
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <CreateInspectionForm
          wells={wells}
          pipes={pipes}
          manifolds={manifolds}
        />
      </DialogContent>
    </Dialog>
  );
}
