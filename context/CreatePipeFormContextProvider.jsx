'use client'
import React,{useState} from 'react'
import CreatePipeFormContext from './CreatePipeFormContext'
const CreatePipeFormContextProvider=({children})=>{
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [completedFormData, setCompletedFormData] = useState(null);
  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (formData) => {
    handleNextStep();
    setFormData((prevData) => ({ ...prevData, ...formData }));
    // You can perform any additional actions with the completed form data here
    // e.g., send it to the server for processing
  };
  const handleSegmentSubmit = (formData,inspectionID) => {
    handleNextStep();
    setFormData((prevData) => ({ ...prevData, ...formData }));
    setFormData((prevData) => ({ ...prevData, ...inspectionID }));

    // You can perform any additional actions with the completed form data here
    // e.g., send it to the server for processing
  };


  const value = {

    step,
    formData,
    setFormData,
    handleNextStep,
    handlePrevStep,
    handleFormSubmit,
    handleSegmentSubmit

  };
return(
    <CreatePipeFormContext.Provider value={value}>
        {children}
    </CreatePipeFormContext.Provider>
)
}
export default CreatePipeFormContextProvider
