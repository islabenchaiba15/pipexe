import { useContext, useState } from 'react'; 
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import Draggable from 'react-draggable'; 
import { Input } from "../components/ui/input"
import AddIcon from '@mui/icons-material/Add';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
  import {FromSelect} from "../components/FromSelect"
  import {NewLine} from "../components/NewLine"
import Image from 'next/image';
import {NewSegment}  from '../components/NewSegment';
import  FormComplete  from './FormComplete';

import CreatePipeFormContext from '../context/CreatePipeFormContext';

const DragModal = ({totalDistance, onClose }) => { 
    
//   const [longueur, setLongueur] = useState(''); 
//   const [type, setType] = useState(''); 
//   const [nature, setNature] = useState(''); 
//   const [from, setFrom] = useState(''); 
//   const [to, setTo] = useState(''); 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onClose(); 
  }; 
 const { step, handleNextStep, handlePrevStep,handleFormSubmit,completedFormData,formData } = useContext(CreatePipeFormContext);

 const renderStep = () => {
    switch (step) {
      case 1:
        return <NewLine onNext={handleNextStep} totalDistance={totalDistance} />;
      case 2:
        return <NewSegment onSubmitForm={handleFormSubmit} onPrev={handlePrevStep} totalDistance={totalDistance}/>;
       case 3:
        return <FormComplete formData={formData} />;
      default:
        return null;
    }
  };
  return ( 
    <>{renderStep()}</>
  ); 
}; 
 
export default DragModal;