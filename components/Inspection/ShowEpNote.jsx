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

export function ShowEpNote() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer no-underline hover:underline">
          <h1 className="text-md font-semibold">1234</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">E&P non periodic inspection creation</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <Image src={"/user.png"} alt={"user"} width={80} height={80}/>
                <div className="flex flex-col items-start gap-3">
                    <h1 className="font-bold text-md">islam benchaiba</h1>
                    <h1 className="">ingenieur -- Exploration & production</h1>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">
                    ouvrage
                </h1>
                <h1 className="text-md font-medium">
                    <span className="">MD21</span> --- pipeline
                </h1>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">message</h1>
                <div className="border border-gray-500 p-4">
                    islam benchaiba islam benchaibaislam benchaibaislam benchaibaislam benchaiba
                    islam benchaibaislam benchaibaislam benchaibaislam benchaibaislam benchaiba
                    islam benchaibaislam benchaibaislam benchaibaislam benchaibaislam benchaiba
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold">E&P pv report </h1>
                <div className="flex gap-6 ">
                    <h1 className="font-medium">donwload</h1>
                    <Image src={"/download.png"} className="cursor-pointer" alt="download" width={20} height={20}/>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
