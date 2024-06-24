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
  import { Badge } from "@/components/ui/badge"
import ActionOfInspection from "./ActionsOfInspection";
import { ShowEpNote } from "./ShowEpNote";
import { ShowInspectionDepRapport } from "./ShowInspectionDepRapport";
import { ShowEvaluation } from "./ShowEvaluation";
import { ShowConstructionRapport } from "./ShowConstructionRapport";
  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'demande':
        return 'default'
      case 'inspection':
        return 'outline';
      case 'decision':
        return 'destructive';
      case 'entretien':
        return 'blue';
      case 'finished':
        return 'green';
    }
  };

  const invoices = [
    {
      Number: "1",
      date:"15/12/2015",
      type: "IDS",
      ouvrage: "md1",
      note_ep: "1223",
      inspection: "2345",
      decision: "1111",
      realisation: "/",
      status: "demande",
    },
    {
        Number: "2",
        date:"5/2/2025",
        type: "manifold",
        ouvrage: "md1",
        note_ep: "1223",
        inspection: "2345",
        decision: "1111",
        realisation: "/",
        status: "inspection",
      },
      {
        Number: "3",
        date:"5/2/2025",
        type: "well",
        ouvrage: "w11",
        note_ep: "1223",
        inspection: "2345",
        decision: "1111",
        realisation: "/",
        status: "decision",
      },
      {
        Number: "2",
        date:"5/2/2025",
        type: "manifold",
        ouvrage: "md1",
        note_ep: "1223",
        inspection: "2345",
        decision: "1111",
        realisation: "/",
        status: "entretien",
      },
      {
        Number: "2",
        date:"5/2/2025",
        type: "manifold",
        ouvrage: "md1",
        note_ep: "1223",
        inspection: "2345",
        decision: "1111",
        realisation: "/",
        status: "finished",
      },
  ];
  
  const TableInspection = () => {
    return (
      <div className="pb-24 ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Number </TableHead>
              <TableHead className="font-bold  text-black">Date</TableHead>
              <TableHead className="font-bold  text-black">inspection type</TableHead>

              <TableHead className="font-bold  text-black">
                Type d'ouvrage
              </TableHead>
              <TableHead className="font-bold  text-black">ouvrage</TableHead>
              <TableHead className="font-bold  text-black">Note E&P</TableHead>
              <TableHead className="font-bold  text-black">rapport inspection </TableHead>
              <TableHead className="font-bold  text-black">rapport decision </TableHead>
              <TableHead className="font-bold  text-black">réalisation PV </TableHead>
              <TableHead className="font-bold  text-black">status </TableHead>
              <TableHead className="font-bold  text-black">actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{invoice.Number}</TableCell>
                <TableCell className="font-semibold	">{invoice.date}</TableCell>
                <TableCell className="font-semibold	">periodic</TableCell>
                <TableCell className="font-semibold	">{invoice.type}</TableCell>
                <TableCell className="font-semibold	">{invoice.ouvrage}</TableCell>
                <TableCell className="font-semibold	"><ShowEpNote/></TableCell>
                <TableCell className="font-semibold	"><ShowInspectionDepRapport/></TableCell>
                <TableCell className="font-semibold	"><ShowEvaluation/></TableCell>
                <TableCell className="font-semibold	"><ShowConstructionRapport/></TableCell>
                <TableCell className="font-semibold	"><Badge variant={getBadgeVariant(invoice.status)}>{invoice.status}</Badge></TableCell>
                <TableCell className="flex items-center ml-4">
                  <ActionOfInspection />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paging className="pb-10"/>
      </div>
    );
  };
  
  export default TableInspection;
  