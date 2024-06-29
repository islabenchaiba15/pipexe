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
import { UpdateManifoldForm } from "./UpdateManifoldForm";

export function UpdateOuvrage ({ inspection, inspectionID }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center justify-start rounded-md cursor-pointer">
          <AutoAwesomeIcon fontSize="small" />
          <h1 className="text-md font-semibold">Update manifold & terminate</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        {" "}
        {/* Changed this line */}
        <DialogHeader>
          <DialogTitle>Update details and terminate </DialogTitle>
          <DialogDescription>
            Please enter a coorect information for the user with all field
          </DialogDescription>
        </DialogHeader>
        <UpdateManifoldForm
          inspection={inspection}
          inspectionID={inspectionID}
        />
      </DialogContent>
    </Dialog>
  );
};

