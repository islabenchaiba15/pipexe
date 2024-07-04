"use client";
import TableUsers from "@/components/Dashboard/TableUsers";
import AddUserForm from "@/components/Dashboard/AddUserForm";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FromSelect } from "@/components/FromSelect";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const departements = [
  {
    value: "Technique",
    label: "Technique",
  },
  {
    value: "Inspection",
    label: "Inspection",
  },
  {
    value: "Production",
    label: "Production",
  },
];

const positions = [
  {
    value: "Engineer 1",
    label: "Engineer 1",
  },
  {
    value: "Engineer 2",
    label: "Engineer 2",
  },
  {
    value: "Department Head",
    label: "Department Head",
  },
];
function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartments([]);
    setSelectedPositions([]);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  return (
    <div className="ml-[10%]">
      <div className="w-[80%] mx-8 overflow-y-auto h-screen scrollbar-hide">
        <div className="flex items-center space-x-2">
          {/* <Image
            src={"/pngarrow.png"}
            alt={"Add"}
            height={35}
            width={35}
            className="cursor-pointer"
          /> */}
          <h1 className="text-3xl font-bold text-black my-4">Users</h1>
        </div>

        <div className="flex gap-3 justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-gray-100 rounded-full flex items-center justify-center px-2 py-1 cursor-pointer">
                <Image
                  src={"/add.svg"}
                  alt={"Add"}
                  height={35}
                  width={35}
                  className="cursor-pointer"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="w-[75%]">
              <DialogHeader>
                <DialogTitle>Add a user </DialogTitle>
                <DialogDescription>
                  Please enter correct information for the user with all field
                </DialogDescription>
              </DialogHeader>
              <AddUserForm
                onClose={onClose}
                closeButton={
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                }
              />
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-1 bg-gray-100 px-2  rounded-2xl ml-[100px] mr-[80px]">
            <Image src={"/search.png"} alt={"Search"} height={30} width={30} />
            <Input
              type="text"
              placeholder="Search by name"
              className="border-0 focus:border-0 no-focus bg-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FromSelect
            filters={departements}
            title="Department"
            selectedValues={selectedDepartments}
            onSelect={setSelectedDepartments}
          />
          <FromSelect
            filters={positions}
            title="Position"
            selectedValues={selectedPositions}
            onSelect={setSelectedPositions}
          />
          <div
            className="bg-gray-100 rounded-full flex items-center justify-center px-2 py-2 cursor-pointer"
            onClick={handleReset}
          >
            <Image
              src={"/restart.png"}
              alt={"Restart"}
              height={35}
              width={35}
            />
          </div>
        </div>
        <TableUsers
          selectedDepartments={selectedDepartments}
          selectedPositions={selectedPositions}
          searchTerm={searchTerm}
        />

        {/* <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 font-bold text-2xl">
            Add User
          </ModalHeader>
          <ModalBody>
            <AddUserForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal> */}
      </div>
    </div>
  );
}

export default Page;
