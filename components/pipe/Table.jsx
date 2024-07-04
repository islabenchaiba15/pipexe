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

const invoices = [
  {
    source: "INV001",
    destination: "INV002",
    diametre: "250.00",
    longeur: "1000",
    année_de_pose: "2001",
    entrée: "1001",
    obseravation: "No observation",
    date_de_maj: "2001",
    actions: "Delete",
  },
  {
    source: "INV001",
    destination: "INV002",
    diametre: "250.00",
    longeur: "1000",
    année_de_pose: "2001",
    entrée: "1001",
    obseravation: "No observation",
    date_de_maj: "2001",
    actions: "Delete",
  },
  {
    source: "INV001",
    destination: "INV002",
    diametre: "250.00",
    longeur: "1000",
    année_de_pose: "2001",
    entrée: "1001",
    obseravation: "No observation",
    date_de_maj: "2001",
    actions: "Delete",
  },
  {
    source: "INV001",
    destination: "INV002",
    diametre: "250.00",
    longeur: "1000",
    année_de_pose: "2001",
    entrée: "1001",
    obseravation: "No observation",
    date_de_maj: "2001",
    actions: "Delete",
  },
];

const TableDemo = ({ segments, pipe }) => {
  console.log("seeeeeeeeeeeeeeeeeegmennnnnnnnt", segments);
  return (
    <Table>
      <TableCaption>A list of your segments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" font-bold">Segment </TableHead>
          <TableHead className="w-[100px] font-bold">Source </TableHead>
          <TableHead className="font-bold">Destination</TableHead>
          <TableHead className="font-bold flex items-center justify-center">
            length.("m")
          </TableHead>
          <TableHead className="font-bold ">Thikness.("")</TableHead>
          <TableHead className="font-bold flex items-center justify-center">
            Année de pose
          </TableHead>
          <TableHead className="font-bold">Obseravation</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {segments.map((segment, index) => (
          <TableRow key={index}>
            <TableCell>{index}</TableCell>
            <TableCell className="font-medium">
              {pipe.fromDetails.name}
            </TableCell>
            <TableCell>{pipe.toDetails.name}</TableCell>
            <TableCell className="flex items-center justify-center">
              {segment.attributes[0].value}
              <span className="font-bold"> m</span>
            </TableCell>
            <TableCell className="font-bold">
              {segment.attributes[1].value}
            </TableCell>
            <TableCell className="font-bold flex items-center justify-center">
              {segment.attributes[2].value}
            </TableCell>
            <TableCell>{segment.obseravation}</TableCell>
            <TableCell className="flex items-center ml-4">
              <ActionDropdown />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
};

export default TableDemo;
