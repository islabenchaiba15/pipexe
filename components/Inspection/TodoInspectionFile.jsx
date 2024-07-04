"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/Api/Index";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ActionDropdown from "../ActionDropdown";
import Paging from "../Pagination";
import { Badge } from "@/components/ui/badge";
import ActionOfInspection from "./ActionsOfInspection";
import { ShowEpNote } from "./ShowEpNote";
import { ShowInspectionDepRapport } from "./ShowInspectionDepRapport";
import { ShowEvaluation } from "./ShowEvaluation";
import { ShowConstructionRapport } from "./ShowConstructionRapport";
import { EpNoteTrigger } from "./NoteEpTrigger";
import { InspectionTrigger } from "./triggers/InpectionTrigger";
import { EvaluationTrigger } from "./triggers/EvaluationTrigger";
import { ConstructionTrigger } from "./triggers/ConstructionTrigger";
import { ResultTrigger } from "./triggers/ResultTrigger";
import { UpdateOuvrage } from "./UpdateOuvrage";
import { ShowUpdatedOuvrage } from "./ShowUpdatedOuvrage";
import { useAuth } from "@/context/AuthContext";

const getBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "inspection":
      return "green";
    case "evaluation":
      return "destructive";
    case "construction":
      return "outline";
    case "closed":
      return "destructive";
    case "finished":
      return "outline";
    case "updated":
      return "blue";
  }
};

const TodoInspectionTable = () => {
  const [inspections, setInspections] = useState([]);
  const [epInspections, setEpInspections] = useState([]);
  const [qualityInspections, setQualityInspections] = useState([]);
  const [conInspections, setConInspections] = useState([]);

  const [inspectionId, setInspectionId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [selectedInspection1, setSelectedInspection1] = useState(null);
  const [selectedInspection2, setSelectedInspection2] = useState(null);
  const [selectedInspection4, setSelectedInspection4] = useState(null);
  const [selectedInspection5, setSelectedInspection5] = useState(null);
  const {user}=useAuth()
  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await axiosInstance.get("/inspection/getAll");
        const allInspections = response.data.inspections || [];
        setInspections(allInspections);
  
        // Filter inspections here
        const epInspections = allInspections.filter(inspection => 
          inspection.inspection.status === 'evaluation' || inspection.inspection.status === 'finished'
        );
        const qualityInspections = allInspections.filter(inspection => 
          inspection.inspection.status === 'inspection'
        );
        const constructionInspections = allInspections.filter(inspection => 
          inspection.inspection.status === 'construction'
        );
  
        setEpInspections(epInspections);
        setQualityInspections(qualityInspections);
        setConInspections(constructionInspections);
  
        console.log('All inspections:', allInspections);
        console.log('EP inspections:', epInspections);
        console.log('Quality inspections:', qualityInspections);
        console.log('Construction inspections:', constructionInspections);
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching inspections:", error);
        setError("Failed to fetch inspections");
        setIsLoading(false);
      }
    };
    fetchInformation();
  }, []);
useEffect(()=>{
    console.log('islaaaaaaaaaaaaaaaaaaaaaam',epInspections)
},[epInspections])
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pb-12 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Number</TableHead>
            <TableHead className="font-bold text-black">Date</TableHead>
            <TableHead className="font-bold text-black">Inspection Type</TableHead>
            <TableHead className="font-bold text-black">Type d'ouvrage</TableHead>
            <TableHead className="font-bold text-black">Ouvrage</TableHead>
            <TableHead className="font-bold text-black">Note E&P</TableHead>
            <TableHead className="font-bold text-black">Rapport Inspection</TableHead>
            <TableHead className="font-bold text-black">Rapport Decision</TableHead>
            <TableHead className="font-bold text-black">Réalisation PV</TableHead>
            <TableHead className="font-bold text-black">Result</TableHead>
            <TableHead className="font-bold text-black">Status</TableHead>
            <TableHead className="font-bold text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         {user.role==="ep" ? (epInspections.map((inspection, index) => (
            <TableRow key={inspection.inspection._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">{formatDate(inspection.inspection.inspection_date)}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.type ? inspection.inspection.type : 'non-periodic'}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.ouvrage_type}</TableCell>
              <TableCell className="font-semibold">{inspection.ouvrage?.name || 'N/A'}</TableCell>
              <TableCell className="font-semibold">
                <EpNoteTrigger id={inspection.inspection.ep_noteID?.ID} 
                  onClick={() => setSelectedInspection(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <InspectionTrigger id={inspection.inspection.Ins_reportID?.ID} 
                  onClick={() => setSelectedInspection1(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <EvaluationTrigger id={inspection.inspection.evaluationID?.ID} 
                  onClick={() => setSelectedInspection2(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ConstructionTrigger id={inspection.inspection.constructionID?.ID} 
                  onClick={() => setSelectedInspection4(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ResultTrigger id={inspection.inspection.constructionID?.ID} inspection={inspection}
                  onClick={() => setSelectedInspection5(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <Badge variant={getBadgeVariant(inspection.inspection.status)}>
                  {inspection.inspection.status}
                </Badge>
              </TableCell>
              
              <TableCell className="flex items-center ml-4">
                <ActionOfInspection inspection={inspection.inspection} inspectionID={inspection.inspection._id}/>
              </TableCell>
            </TableRow>
          ))):user.role === "inspection" ? 
          (qualityInspections.map((inspection, index) => (
            <TableRow key={inspection.inspection._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">{formatDate(inspection.inspection.inspection_date)}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.type ? inspection.inspection.type : 'non-periodic'}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.ouvrage_type}</TableCell>
              <TableCell className="font-semibold">{inspection.ouvrage?.name || 'N/A'}</TableCell>
              <TableCell className="font-semibold">
                <EpNoteTrigger id={inspection.inspection.ep_noteID?.ID} 
                  onClick={() => setSelectedInspection(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <InspectionTrigger id={inspection.inspection.Ins_reportID?.ID} 
                  onClick={() => setSelectedInspection1(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <EvaluationTrigger id={inspection.inspection.evaluationID?.ID} 
                  onClick={() => setSelectedInspection2(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ConstructionTrigger id={inspection.inspection.constructionID?.ID} 
                  onClick={() => setSelectedInspection4(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ResultTrigger id={inspection.inspection.constructionID?.ID} inspection={inspection}
                  onClick={() => setSelectedInspection5(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <Badge variant={getBadgeVariant(inspection.inspection.status)}>
                  {inspection.inspection.status}
                </Badge>
              </TableCell>
              
              <TableCell className="flex items-center ml-4">
                <ActionOfInspection inspection={inspection.inspection} inspectionID={inspection.inspection._id}/>
              </TableCell>
            </TableRow>
          ))) : 
          (conInspections.map((inspection, index) => (
            <TableRow key={inspection.inspection._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">{formatDate(inspection.inspection.inspection_date)}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.type ? inspection.inspection.type : 'non-periodic'}</TableCell>
              <TableCell className="font-semibold">{inspection.inspection.ouvrage_type}</TableCell>
              <TableCell className="font-semibold">{inspection.ouvrage?.name || 'N/A'}</TableCell>
              <TableCell className="font-semibold">
                <EpNoteTrigger id={inspection.inspection.ep_noteID?.ID} 
                  onClick={() => setSelectedInspection(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <InspectionTrigger id={inspection.inspection.Ins_reportID?.ID} 
                  onClick={() => setSelectedInspection1(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <EvaluationTrigger id={inspection.inspection.evaluationID?.ID} 
                  onClick={() => setSelectedInspection2(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ConstructionTrigger id={inspection.inspection.constructionID?.ID} 
                  onClick={() => setSelectedInspection4(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <ResultTrigger id={inspection.inspection.constructionID?.ID} inspection={inspection}
                  onClick={() => setSelectedInspection5(inspection.inspection._id)}
                />
              </TableCell>
              <TableCell className="font-semibold">
                <Badge variant={getBadgeVariant(inspection.inspection.status)}>
                  {inspection.inspection.status}
                </Badge>
              </TableCell>
              
              <TableCell className="flex items-center ml-4">
                <ActionOfInspection inspection={inspection.inspection} inspectionID={inspection.inspection._id}/>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      <Paging className="pb-10" />
      <ShowEpNote
        isOpen={!!selectedInspection}
        onClose={() => setSelectedInspection(null)}
        InspectionID={selectedInspection}
      />
      <ShowInspectionDepRapport
        isOpen={!!selectedInspection1}
        onClose={() => setSelectedInspection1(null)}
        InspectionID={selectedInspection1}
      />
      <ShowEvaluation
        isOpen={!!selectedInspection2}
        onClose={() => setSelectedInspection2(null)}
        InspectionID={selectedInspection2}
      />
      <ShowConstructionRapport
        isOpen={!!selectedInspection4}
        onClose={() => setSelectedInspection4(null)}
        InspectionID={selectedInspection4}
      />
      <ShowUpdatedOuvrage
        isOpen={!!selectedInspection5}
        onClose={() => setSelectedInspection5(null)}
        InspectionID={selectedInspection5}
      />
    </div>
  );
};

export default TodoInspectionTable;