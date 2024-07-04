import { useContext, useState } from "react";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import Draggable from "react-draggable";
import { Input } from "../components/ui/input";
import AddIcon from "@mui/icons-material/Add";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FromSelect } from "../components/FromSelect";
import { NewLine } from "../components/NewLine";
import { LengthSegment } from "../components/LengthSegment";
import Image from "next/image";
import { NewSegment } from "../components/NewSegment";
import FormComplete from "./FormComplete";
import CreatePipeFormContext from "../context/CreatePipeFormContext";
import { Stepper, Step, StepLabel } from "@mui/material";
import Link from "next/link";

const DragModal = ({ totalDistance, onClose }) => {
  const {
    step,
    handleNextStep,
    handlePrevStep,
    handleFormSubmit,
    completedFormData,
    formData,
  } = useContext(CreatePipeFormContext);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NewLine onNext={handleNextStep} totalDistance={totalDistance} />
        );
      case 2:
        return (
          <NewSegment
            onSubmitForm={handleFormSubmit}
            onPrev={handlePrevStep}
            totalDistance={totalDistance}
          />
        );
      case 3:
        return <FormComplete formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex items-center space-x-2 mt-6 mb-8 ml-8">
        <Link href={"/"}>
          <Image
            src={"/pngarrow.png"}
            alt={"Add"}
            height={26}
            width={26}
            className="cursor-pointer"
          />
        </Link>
        <h1 className="text-blueNav text-2xl font-bold">New pipe</h1>
      </div>
      <Stepper activeStep={step - 1} className="2xl:mx-8 mx-2">
        <Step>
          <StepLabel>Line Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Segments Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Review</StepLabel>
        </Step>
      </Stepper>
      {renderStep()}
    </div>
  );
};

export default DragModal;
