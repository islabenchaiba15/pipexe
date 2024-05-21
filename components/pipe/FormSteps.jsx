// import { useContext, useState } from 'react';
// import { NewSegment } from '../../components/NewSegment';
// import FormComplete from '../../components/FormComplete';
// import CreatePipeFormContext from '../../context/CreatePipeFormContext';
// import { Stepper, Step, StepLabel } from '@mui/material';
// import PipeForm from '../../components/PipeForm';

// const FormSteps = ({totalDistance}) => {
//   const { step, handleNextStep, handlePrevStep, handleFormSubmit, completedFormData, formData } = useContext(CreatePipeFormContext);

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <PipeForm onNext={handleNextStep} totalDistance={totalDistance}/>;
//       case 2:
//         return <NewSegment onSubmitForm={handleFormSubmit} onPrev={handlePrevStep} totalDistance={totalDistance}/>;
//       case 3:
//         return <FormComplete formData={formData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="">
//     <h1 className="font-bold text-4xl text-black my-12 2xl:mx-10 mx-2">New Line</h1>
//       <Stepper activeStep={step - 1} className="2xl:mx-8 mx-2">
//         <Step>
//           <StepLabel>Line Details</StepLabel>
//         </Step>
//         <Step>
//           <StepLabel>Segments Details</StepLabel>
//         </Step>
//         <Step>
//           <StepLabel>Review</StepLabel>
//         </Step>
//       </Stepper>
//       {renderStep()}
//     </div>
//   );
// };

// export default FormSteps;