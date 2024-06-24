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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateInspectionForm } from "./CreateInspectionForm";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function ShowConstructionRapport() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="cursor-pointer no-underline hover:underline">
          <h1 className="text-md font-semibold">9999</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Construction tracking & report
          </DialogTitle>
          <DialogDescription className="bg-blue-800 w-fit  rounded-full">
            <h1 className="font-semibold text-white mx-3 my-1">in work</h1>
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="">
            <TabsTrigger value="report">report</TabsTrigger>
            <TabsTrigger value="activity">activity</TabsTrigger>
          </TabsList>
          <TabsContent value="report">
            <div className="flex flex-col gap-4 mx-2 my-8">
              <div className="flex gap-4 items-center">
                <Image src={"/user.png"} alt={"user"} width={80} height={80} />
                <div className="flex flex-col items-start gap-3">
                  <h1 className="font-bold text-md">islam benchaiba</h1>
                  <h1 className="">ingenieur -- Construction</h1>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md">message</h1>
                <div className="border border-gray-500 p-4">
                  islam benchaiba islam benchaibaislam benchaibaislam
                  benchaibaislam benchaiba islam benchaibaislam benchaibaislam
                  benchaibaislam benchaibaislam benchaiba islam benchaibaislam
                  benchaibaislam benchaibaislam benchaibaislam benchaiba
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">construction final report </h1>
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
          </TabsContent>
          <TabsContent value="activity" className="mx-4 my-3">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <CheckCircleIcon fontSize="small" className="mt-1"/>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold text-md">12-15-2024</h1>
                  <h1 className="font-medium text-sm text-gray-600">
                    lancer la construction de pipeline
                  </h1>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircleIcon fontSize="small" className="mt-1"/>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold text-md">12-15-2024</h1>
                  <h1 className="font-medium text-sm text-gray-600">
                    lancer la construction de pipeline
                  </h1>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircleIcon fontSize="small" className="mt-1"/>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold text-md">12-15-2024</h1>
                  <h1 className="font-medium text-sm text-gray-600">
                    lancer la construction de pipeline
                  </h1>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
