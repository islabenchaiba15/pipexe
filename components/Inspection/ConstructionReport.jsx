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
import { ConstructionRaportForm } from "./ConstructionRaportForm";

export function ConstructionRaport({inspectionID}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row gap-4 items-center justify-start rounded-md cursor-pointer">
          <AutoAwesomeIcon className="h-8 w-8" />
          <h1 className="text-md font-semibold">Final report</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Send the final rapport to E&P
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <ConstructionRaportForm inspectionID={inspectionID}/>
      </DialogContent>
    </Dialog>
  );
}
