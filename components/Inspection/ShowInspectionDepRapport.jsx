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
import Image from "next/image";

export function ShowInspectionDepRapport() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer no-underline hover:underline">
          <h1 className="text-md font-semibold">7777</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Inspection departement non periodic report
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Image src={"/user.png"} alt={"user"} width={80} height={80} />
            <div className="flex flex-col items-start gap-3">
              <h1 className="font-bold text-md">islam benchaiba</h1>
              <h1 className="">ingenieur -- Inspection departement</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-md">file version</h1>
            <h1 className="text-md font-medium">
              <span className="">rapport validated and not signed</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-md">message</h1>
            <div className="border border-gray-500 p-4">
              islam benchaiba islam benchaibaislam benchaibaislam benchaibaislam
              benchaiba islam benchaibaislam benchaibaislam benchaibaislam
              benchaibaislam benchaiba islam benchaibaislam benchaibaislam
              benchaibaislam benchaibaislam benchaiba
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Inpection departement report </h1>
            <div className="flex gap-6 ">
              <h1 className="font-medium">donwload</h1>
              <Image
                src={"/download.png"}
                className="cursor-pointer"
                alt="download"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
