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
      <div className="z-50 fixed flex items-center justify-center mr-[50%] "> 
        {
            Active ? 
                <div className="bg-white rounded shadow-xl p-6">
                    <p className='font-bold text-black text-xl mb-3'>Nouvelle ligne </p>
                    <form onSubmit={handleSubmit}> 
                    <div className="mb-4 flex items-center gap-5"> 
                    <Label htmlFor="longeur" className="text-lg">Longeur</Label>
                        <h3 className='text-semibold text-xl'>{totalDistance}</h3>
                    </div> 
                    <div className="mb-4 flex items-center gap-5 ">
                        <Label htmlFor="Largeur" className="text-lg">Largeur</Label>
                        <Input type="number" step={0.1} className="w-[180px]"/>
                    </div>
                    <div className="mb-4 flex items-center gap-5"> 
                        <Label htmlFor="Type" className="text-lg">Type</Label>
                        <Select onValueChange={handleColorChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="white">gaz</SelectItem>
                                <SelectItem value="red">petrol</SelectItem>
                                <SelectItem value="blue">eau</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> 
                    <div className="mb-4 flex items-center gap-5"> 
                        <Label htmlFor="Nature" className="text-lg">Nature</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">collecteur</SelectItem>
                                <SelectItem value="dark">collect</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> 
                    <div className="mb-4 flex items-start justify-start gap-5"> 
                        <Label htmlFor="Nature" className="text-lg">From</Label>
                        <FromSelect/>
                    </div>  
                    <div className="mb-4 flex items-center gap-5"> 
                        <Label htmlFor="Nature" className="text-lg">To</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> 
                    <div className="flex justify-end"> 
                    <Button variant="outline" className="">annuler</Button>
                        <Button variant="default" className=""onClick={handleNextStep}>continue</Button>
                    </div> 
                    </form> 
                </div>
                :
                <div className="bg-white rounded shadow-xl p-6">
                    <h1 className='font-bold text-black text-xl mb-3'>Ajouter segment</h1>
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-4 flex flex-col items-center gap-5 ">
      {/* Render existing input fields */}
                            <div className="flex flex-col items-start">
                                {inputs.map((input, index) => (
                                    <div className='flex justify-between items-center gap-24 my-2'>
                                        <h1>{index}</h1>
                                        <Input
                                        type="number"
                                        key={index}
                                        value={input}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className="w-[180px]"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Add icon to dynamically add more input fields */}
                            <Button onClick={handleAddInput} className="w-full">
                                <AddIcon />
                                Add Input</Button>
                        </div>
                        <div className="mb-4 flex items-center gap-5"> 
                            <h3 className='text-semibold text-xl'>il vous reste {totalDistance} m</h3>
                        </div> 
                        <div className="flex justify-end"> 
                        <Button variant="outline" className="">annuler</Button>
                            <Button variant="default" className="" onClick={handleNextStep}>continue</Button>
                        </div> 
                    </form> 
                </div>
        } 
       </div> 
    </Draggable>
  ); 
}; 
 
export default DragModal;