import { useState } from 'react'; 
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
import Image from 'next/image';

const DragModal = ({totalDistance, onClose }) => { 
    
  const [longueur, setLongueur] = useState(''); 
  const [type, setType] = useState(''); 
  const [nature, setNature] = useState(''); 
  const [from, setFrom] = useState(''); 
  const [to, setTo] = useState(''); 
  const [inputs, setInputs] = useState(['']); // State to hold input values

  // Function to handle adding new input field
  const handleAddInput = (e) => {
    e.preventDefault()
    setInputs([...inputs, '']);
     // Add a new empty input to the inputs array
  };

  // Function to handle input change
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };
  const [Active,setActive] = useState(true);
  const handleColorChange = (value) => {
    setColor(value)
  }
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    // handle form submission here 
    onClose(); 
  }; 
 const handleNextStep=()=>{
    setActive(false);
 }
  return ( 
    <Draggable className="z-50">
      <div className="z-50 fixed w-[400px] flex items-center justify-center mr-[50%] "> 
        <div className="bg-white rounded shadow-xl p-6">
            <p className='font-bold text-black text-xl mb-3'>Fill information of each segments </p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
                <div className="flex items-center gap-20 justify-between">
                    <Label className="font-semibold text-xl">thikness</Label>
                    <Input className="max-w-[180px]"/>
                </div>
                <div className="flex items-center gap-20 justify-start">
                    <Label className="font-semibold text-xl">Diametre</Label>
                    <Input className="max-w-[180px]"/>
                </div>
                <div className="flex items-center gap-10 justify-start">
                    <Label className="font-semibold text-xl">Annéé d'installation</Label>
                    <Input className="max-w-[180px]"/>
                </div>
                <div className="flex items-center gap-10 justify-start">
                    <Label className="font-semibold text-xl">eppisseur nom</Label>
                    <Input className="max-w-[180px]" />
                </div>
                <div className="flex items-center gap-10 justify-start">
                    <Label className="font-semibold text-xl">eppisseur min</Label>
                    <Input className="max-w-[180px]" />
                </div>
                <div className="flex justify-end"> 
                    <Button variant="outline" className="">annuler</Button>
                    <Button variant="default" className="" onClick={handleNextStep}>continue</Button>
                </div> 
            </form> 
        </div>
       </div> 
    </Draggable>
  ); 
}; 
 
export default DragModal;