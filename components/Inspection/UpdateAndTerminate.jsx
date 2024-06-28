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
import { EpEvaluationForm } from "./EpEvaluationForm";
import UpdatePage from "./UpdatePage";

export function UpdateAndTerminate({inspectionID}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center justify-start rounded-md cursor-pointer">
          <AutoAwesomeIcon fontSize="small" />
          <h1 className="text-md font-semibold">Update & terminate</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90%] sm:max-h-[90%]">
        <DialogHeader>
          <DialogTitle className="text-xl">
           Update the infrastructure to close Inspection
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <UpdatePage inspectionID={inspectionID}/>
      </DialogContent>
    </Dialog>
  );
}
